package com.xuecheng.content.service.impl;

import com.alibaba.fastjson.JSON;
import com.xuecheng.base.execption.XueChengPlusException;
import com.xuecheng.content.config.MultipartSupportConfig;
import com.xuecheng.content.feignclient.MediaServiceClient;
import com.xuecheng.content.feignclient.SearchServiceClient;
import com.xuecheng.content.feignclient.CourseIndex;
import com.xuecheng.content.mapper.CourseBaseMapper;
import com.xuecheng.content.mapper.CourseMarketMapper;
import com.xuecheng.content.mapper.CoursePublishMapper;
import com.xuecheng.content.mapper.CoursePublishPreMapper;
import com.xuecheng.content.model.dto.CourseBaseInfoDto;
import com.xuecheng.content.model.dto.CoursePreviewDto;
import com.xuecheng.content.model.dto.TeachplanDto;
import com.xuecheng.content.model.po.CourseBase;
import com.xuecheng.content.model.po.CourseMarket;
import com.xuecheng.content.model.po.CoursePublish;
import com.xuecheng.content.model.po.CoursePublishPre;
import com.xuecheng.content.service.CourseBaseInfoService;
import com.xuecheng.content.service.CoursePublishService;
import com.xuecheng.content.service.TeachplanService;
import com.xuecheng.messagesdk.model.po.MqMessage;
import com.xuecheng.messagesdk.service.MqMessageService;
import freemarker.cache.ClassTemplateLoader;
import freemarker.template.Configuration;
import freemarker.template.Template;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * @Author yaCoding
 * @create 2023-02-16 上午 11:06
 */
@Service
@Slf4j
//课程发布相关接口实现
public class CoursePublishServiceImpl implements CoursePublishService {

    @Autowired
    CourseBaseInfoService courseBaseInfoService;

    @Autowired
    TeachplanService teachplanService;

    @Autowired
    CourseBaseMapper courseBaseMapper;

    @Autowired
    CourseMarketMapper courseMarketMapper;

    @Autowired
    CoursePublishPreMapper coursePublishPreMapper;

    @Autowired
    CoursePublishMapper coursePublishMapper;

    @Autowired
    MqMessageService mqMessageService;

    @Autowired
    SearchServiceClient searchServiceClient;

    @Autowired
    MediaServiceClient mediaServiceClient;

    @Autowired
    RedisTemplate redisTemplate;

    @Autowired
    RedissonClient redissonClient;


    //获取课程预览信息
    @Override
    public CoursePreviewDto getCoursePreviewInfo(Long courseId) {
        CoursePreviewDto coursePreviewDto = new CoursePreviewDto();
        //课程基本信息,营销信息
        CourseBaseInfoDto courseBaseInfo = courseBaseInfoService.getCourseBaseInfo(courseId);
        coursePreviewDto.setCourseBase(courseBaseInfo);
        //课程计划信息
        List<TeachplanDto> teachplanTree = teachplanService.findTeachplanTree(courseId);
        coursePreviewDto.setTeachplans(teachplanTree);
        return coursePreviewDto;
    }

    //提交审计
    @Override
    public void commitAudit(Long companyId, Long courseId) {
        CourseBaseInfoDto courseBaseInfo = courseBaseInfoService.getCourseBaseInfo(courseId);
        if (courseBaseInfo == null) {
            XueChengPlusException.cast("课程找不到");
        }
        //审核状态
        String auditStatus = courseBaseInfo.getAuditStatus();

        //如果课程的审核状态为已提交则不允许提交
        if (auditStatus.equals("202003")) {
            XueChengPlusException.cast("课程已提交请等待审核");
        }
        //本机构只能提交本机构的课程
        //todo:本机构只能提交本机构的课程

        //课程的图片、计划信息没有填写也不允许提交
        String pic = courseBaseInfo.getPic();
        if (StringUtils.isEmpty(pic)) {
            XueChengPlusException.cast("请求上传课程图片");
        }

        //查询课程计划
        //课程计划信息
        List<TeachplanDto> teachplanTree = teachplanService.findTeachplanTree(courseId);
        if (teachplanTree == null || teachplanTree.size() == 0) {
            XueChengPlusException.cast("请编写课程计划");
        }

        //查询到课程基本信息、营销信息、计划等信息插入到课程预发布表
        CoursePublishPre coursePublishPre = new CoursePublishPre();
        BeanUtils.copyProperties(courseBaseInfo, coursePublishPre);
        //设置机构id
        coursePublishPre.setCompanyId(companyId);
        //营销信息
        CourseMarket courseMarket = courseMarketMapper.selectById(courseId);
        //转json
        String courseMarketJson = JSON.toJSONString(courseMarket);
        coursePublishPre.setMarket(courseMarketJson);
        //计划信息
        //转json
        String teachplanTreeJson = JSON.toJSONString(teachplanTree);
        coursePublishPre.setTeachplan(teachplanTreeJson);
        //状态为已提交
        coursePublishPre.setStatus("202003");
        //提交时间
        coursePublishPre.setCreateDate(LocalDateTime.now());
        //查询预发布表，如果有记录则更新，没有则插入
        CoursePublishPre coursePublishPreObj = coursePublishPreMapper.selectById(courseId);
        if (coursePublishPreObj == null) {
            //插入
            coursePublishPreMapper.insert(coursePublishPre);
        } else {
            //更新
            coursePublishPreMapper.updateById(coursePublishPre);
        }
        //更新课程基本信息表的审核状态为已提交
        CourseBase courseBase = courseBaseMapper.selectById(courseId);
        courseBase.setAuditStatus("202003");//审核状态为已提交
        courseBaseMapper.updateById(courseBase);

//        //约束校验
//        CourseBase courseBase = courseBaseMapper.selectById(courseId);
//        //课程审核状态
//        String auditStatus = courseBase.getAuditStatus();
//        //当前审核状态为已提交不允许再次提交
//        if ("202003".equals(auditStatus)) {
//            XueChengPlusException.cast("当前为等待审核状态，审核完成可以再次提交。");
//        }
//        //本机构只允许提交本机构的课程
//        if (!courseBase.getCompanyId().equals(companyId)) {
//            XueChengPlusException.cast("不允许提交其它机构的课程。");
//        }
//        //课程图片是否填写
//        if (StringUtils.isEmpty(courseBase.getPic())) {
//            XueChengPlusException.cast("提交失败，请上传课程图片");
//        }
//
//        //查询课程计划信息
//        List<TeachplanDto> teachplanTree = teachplanService.findTeachplanTree(courseId);
//        if (teachplanTree.size() <= 0) {
//            XueChengPlusException.cast("提交失败，还没有添加课程计划");
//        }
//
//        //封装数据，基本信息、营销信息、课程计划信息、师资信息
//        CoursePublishPre coursePublishPre = new CoursePublishPre();
//        //查询基本信息
//        CourseBaseInfoDto courseBaseInfo = courseBaseInfoService.getCourseBaseInfo(courseId);
//        BeanUtils.copyProperties(courseBaseInfo, coursePublishPre);
//        //将课程计划信息转json
//        String teachplanTreeJson = JSON.toJSONString(teachplanTree);
//        coursePublishPre.setTeachplan(teachplanTreeJson);
//        //课程营销信息
//        CourseMarket courseMarket = courseMarketMapper.selectById(courseId);
//        //转为json
//        String courseMarketJson = JSON.toJSONString(courseMarket);
//        //将课程营销信息json数据放入课程预发布表
//        coursePublishPre.setMarket(courseMarketJson);
//
//        //课程预发布表初始审核状态
//        coursePublishPre.setStatus("202003");
//
//        CoursePublishPre coursePublishPre1 = coursePublishPreMapper.selectById(courseId);
//        if (coursePublishPre1 == null) {
//            coursePublishPreMapper.insert(coursePublishPre);
//        } else {
//            coursePublishPreMapper.updateById(coursePublishPre);
//        }
//
//        //更新课程基本表的审核状态
//        courseBase.setAuditStatus("202003");
//        courseBaseMapper.updateById(courseBase);
    }

    @Transactional
    @Override
    public void publish(Long companyId, Long courseId) {
        //查询预发布表
        CoursePublishPre coursePublishPre = coursePublishPreMapper.selectById(courseId);
        if (coursePublishPre == null) {
            XueChengPlusException.cast("课程没有审核记录，无法发布");
        }
        //状态
        String status = coursePublishPre.getStatus();
        //课程如果没有审核通过不允许发布
        if (!status.equals("202004")) {
            XueChengPlusException.cast("课程没有审核通过不允许发布");
        }

        //向课程发布表写入数据
        CoursePublish coursePublish = new CoursePublish();
        BeanUtils.copyProperties(coursePublishPre, coursePublish);
        //先查询课程发布，如果有则更新，没有再添加
        CoursePublish coursePublishObj = coursePublishMapper.selectById(courseId);
        if (coursePublishObj == null) {
            coursePublishMapper.insert(coursePublish);
        } else {
            coursePublishMapper.updateById(coursePublish);
        }

        //向消息表写入数据
//        mqMessageService.addMessage("course_publish",String.valueOf(courseId),null,null);
        saveCoursePublishMessage(courseId);

        //将预发布表数据删除
        coursePublishPreMapper.deleteById(courseId);
    }

    @Override
    public Boolean saveCourseIndex(Long courseId) {
        //查询课程发布表的数据
        CoursePublish coursePublish = coursePublishMapper.selectById(courseId);

        //...异常处理
        //组装数据
        CourseIndex courseIndex = new CourseIndex();
        BeanUtils.copyProperties(coursePublish,courseIndex);

        //远程调用搜索服务创建索引
        Boolean result = searchServiceClient.add(courseIndex);
        if(!result){
            XueChengPlusException.cast("创建课程索引失败");
        }

        return result;

    }

    //生成课程HTML
    @Override
    public File generateCourseHtml(Long courseId) {

        Configuration configuration = new Configuration(Configuration.getVersion());
        //最终的静态文件
        File htmlFile = null;
        try {
            //拿到classpath路径
//            String classpath = this.getClass().getResource("/").getPath();
//            //指定模板的目录
//            configuration.setDirectoryForTemplateLoading(new File(classpath+"/templates/"));
            //更改为如下方式
            configuration.setTemplateLoader(new ClassTemplateLoader(this.getClass().getClassLoader(), "/templates"));
            //指定编码
            configuration.setDefaultEncoding("utf-8");

            //得到模板
            Template template = configuration.getTemplate("course_template.ftl");
            //准备数据
            CoursePreviewDto coursePreviewInfo = this.getCoursePreviewInfo(courseId);
            HashMap<String, Object> map = new HashMap<>();
            map.put("model", coursePreviewInfo);

            //Template template 模板, Object model 数据
            String html = FreeMarkerTemplateUtils.processTemplateIntoString(template, map);
            //输入流
            InputStream inputStream = IOUtils.toInputStream(html, "utf-8");
            htmlFile = File.createTempFile("coursepublish", ".html");
            //输出文件
            FileOutputStream outputStream = new FileOutputStream(htmlFile);
            //使用流将html写入文件
            IOUtils.copy(inputStream, outputStream);
        } catch (Exception ex) {
            log.error("页面静态化出现问题,课程id:{}", courseId, ex);
            ex.printStackTrace();
        }
        return htmlFile;
    }

    @Override
    public void uploadCourseHtml(Long courseId, File file) {
        try {
            //将file转成MultipartFile
            MultipartFile multipartFile = MultipartSupportConfig.getMultipartFile(file);
            //远程调用得到返回值
            String upload = mediaServiceClient.upload(multipartFile, "course/" + courseId + ".html");
            if (upload == null) {
                log.debug("远程调用走降级逻辑得到上传的结果为null,课程id:{}", courseId);
                XueChengPlusException.cast("上传静态文件过程中存在异常");
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            XueChengPlusException.cast("上传静态文件过程中存在异常");
        }

    }

    @Override
    public CoursePublish getCoursePublish(Long courseId) {
        CoursePublish coursePublish = coursePublishMapper.selectById(courseId);
        return coursePublish;
    }

    //使用redisson实现分布式锁
    @Override
    public CoursePublish getCoursePublishCache(Long courseId) {

        //从缓存中查询
        Object jsonObj = redisTemplate.opsForValue().get("course:" + courseId);
        //缓存中有
        if (jsonObj != null) {
    //            System.out.println("=============从缓存中查询=============");
            //缓存中有直接返回数据
            String jsonString = jsonObj.toString();
            if ("null".equals(jsonString)) {
                return null;
            }
            CoursePublish coursePublish = JSON.parseObject(jsonString, CoursePublish.class);
            return coursePublish;
        } else {
            RLock lock = redissonClient.getLock("coursequerylock:" + courseId);
            //获取分布式锁
            lock.lock();
            try {
                //再次查询一下缓存
                //从缓存中查询
                jsonObj = redisTemplate.opsForValue().get("course:" + courseId);
                //缓存中有
                if (jsonObj != null) {
                    //缓存中有直接返回数据
                    String jsonString = jsonObj.toString();
                    if ("null".equals(jsonString)) {
                        return null;
                    }
                    CoursePublish coursePublish = JSON.parseObject(jsonString, CoursePublish.class);
                    return coursePublish;
                }
                System.out.println("==查询数据库==");
    //                try {
    //                    //手动延迟，测试锁的续期功能
    //                    Thread.sleep(60000);
    //                } catch (InterruptedException e) {
    //                    throw new RuntimeException(e);
    //                }
                //从数据库查询
                CoursePublish coursePublish = getCoursePublish(courseId);
                //查询完成再存储到redis
                redisTemplate.opsForValue().set("course:" + courseId, JSON.toJSONString(coursePublish), 300, TimeUnit.SECONDS);
                return coursePublish;

            } finally {
                //手动释放锁
                lock.unlock();
            }
        }

    }
//        public CoursePublish getCoursePublishCache(Long courseId){
//
//            //先从缓存中查询
//            String jsonString = (String) redisTemplate.opsForValue().get("course:" + courseId);
//            if(StringUtils.isNotEmpty(jsonString)){
////                System.out.println("========从缓存中查询===========");
//                //将json转成对象返回
//                CoursePublish coursePublish = JSON.parseObject(jsonString, CoursePublish.class);
//                return coursePublish;
//            }else{
//                //使用setnx向redis设置一个key，谁设置成功谁拿到了锁
//                Boolean lock001 = redisTemplate.opsForValue().setIfAbsent("lock001", "001");
//                if(lock001){
//                    //获取锁这个人去执行这里边的代码
//                }
//                synchronized (this){
//                    //再次从缓存中查询一下
//                    jsonString = (String) redisTemplate.opsForValue().get("course:" + courseId);
//                    if(StringUtils.isNotEmpty(jsonString)){
//                        //将json转成对象返回
//                        CoursePublish coursePublish = JSON.parseObject(jsonString, CoursePublish.class);
//                        return coursePublish;
//                    }
//                    System.out.println("从数据库查询...");
//                    //如果缓存中没有，要从数据库查询
//                    CoursePublish coursePublish = coursePublishMapper.selectById(courseId);
//                    //将从数据库查询到的数据存入缓存
//                    redisTemplate.opsForValue().set("course:" + courseId,JSON.toJSONString(coursePublish),300, TimeUnit.SECONDS);
//                    return coursePublish ;
//                }
//            }
//
//    }

    //添加了redis缓存，解决了缓存穿透
//    public CoursePublish getCoursePublishCache(Long courseId){
//        //先从缓存中查询
//        String jsonString = (String) redisTemplate.opsForValue().get("course:" + courseId);
//        if(StringUtils.isNotEmpty(jsonString)){
//            System.out.println("========从缓存中查询===========");
//            if("null".equals(jsonString)){
//                return null;
//            }
//            //将json转成对象返回
//            CoursePublish coursePublish = JSON.parseObject(jsonString, CoursePublish.class);
//            return coursePublish;
//        }else{
//            System.out.println("从数据库查询...");
//            //如果缓存中没有，要从数据库查询
//            CoursePublish coursePublish = coursePublishMapper.selectById(courseId);
////            if(coursePublish!=null){//解决缓存穿透，查询一个不存在的数据仍然将null存入缓存
//                //将从数据库查询到的数据存入缓存
//                redisTemplate.opsForValue().set("course:" + courseId,JSON.toJSONString(coursePublish),300, TimeUnit.SECONDS);
////            }
//            return coursePublish ;
//        }
//
//    }

    //保存消息表记录
    private void saveCoursePublishMessage(Long courseId) {
        MqMessage mqMessage = mqMessageService.addMessage("course_publish", String.valueOf(courseId), null, null);
        if(mqMessage == null){
            XueChengPlusException.cast("添加消息记录失败");
        }
    }

//    //保存课程发布信息
//    private void saveCoursePublish(Long courseId) {
//        //课程发布信息来源于预发布表
//        CoursePublishPre coursePublishPre = coursePublishPreMapper.selectById(courseId);
//
//        CoursePublish coursePublish = new CoursePublish();
//        //拷贝到课程发布对象
//        BeanUtils.copyProperties(coursePublishPre,coursePublish);
//        coursePublish.setStatus("203002");//已发布
//
//        CoursePublish coursePublishUpdate = coursePublishMapper.selectById(courseId);
//        if(coursePublishUpdate == null){
//            coursePublishMapper.insert(coursePublish);
//        }else{
//            coursePublishMapper.updateById(coursePublish);
//        }
//        //更新课程基本表的发布状态
//        CourseBase courseBase = courseBaseMapper.selectById(courseId);
//        courseBase.setStatus("203002");//已发布
//        courseBaseMapper.updateById(courseBase);
//    }


}
