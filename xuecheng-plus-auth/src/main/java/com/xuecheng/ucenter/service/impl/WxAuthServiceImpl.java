package com.xuecheng.ucenter.service.impl;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.xuecheng.ucenter.mapper.XcUserMapper;
import com.xuecheng.ucenter.mapper.XcUserRoleMapper;
import com.xuecheng.ucenter.model.dto.AuthParamsDto;
import com.xuecheng.ucenter.model.dto.XcUserExt;
import com.xuecheng.ucenter.model.po.XcUser;
import com.xuecheng.ucenter.model.po.XcUserRole;
import com.xuecheng.ucenter.service.AuthService;
import com.xuecheng.ucenter.service.WxAuthService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

/**
 * @Author yaCoding
 * @create 2023-02-18 下午 8:25
 */

@Service("wx_authservice")
public class WxAuthServiceImpl implements AuthService, WxAuthService {

    @Autowired
    XcUserMapper xcUserMapper;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    XcUserRoleMapper xcUserRoleMapper;

    @Autowired
    WxAuthServiceImpl currentPorxy;

    @Value("${weixin.appid}")
    String appid;

    @Value("${weixin.secret}")
    String secret;

    //拿授权码申请令牌，查询用户
    public XcUser wxAuth(String code) {
        //拿授权码获取access_token
        Map<String, String> access_token_map = getAccess_token(code);
//        System.out.println(access_token_map);
        //访问令牌
        String access_token = access_token_map.get("access_token");
        //得到openid
        String openid = access_token_map.get("openid");
        //拿令牌获取用户信息
        Map<String, String> userinfo = getUserinfo(access_token, openid);
//        System.out.println(userinfo);
        //保存用户信息到数据库
        XcUser xcUser = currentPorxy.addWxUser(userinfo);
        return xcUser;
    }

    @Transactional
    public XcUser addWxUser(Map<String, String> userInfo_map) {
        //先取出unionid
        String unionid = userInfo_map.get("unionid");
        String nickname = userInfo_map.get("nickname");
        //根据unionid查询用户信息
        XcUser xcUser = xcUserMapper.selectOne(new LambdaQueryWrapper<XcUser>().eq(XcUser::getWxUnionid, unionid));
        if(xcUser!=null){
            //该用户在系统存在
            return xcUser;
        }
        //向数据库新增记录
        xcUser = new XcUser();
        //用户id
        String userId = UUID.randomUUID().toString();
        xcUser.setId(userId);//主键
        xcUser.setUsername(unionid);
        xcUser.setPassword(unionid);
        xcUser.setWxUnionid(unionid);
        xcUser.setNickname(nickname);
        xcUser.setName(nickname);
        xcUser.setUtype("101001");//学生类型
        xcUser.setStatus("1");//用户状态
        xcUser.setCreateTime(LocalDateTime.now());
        //插入
        int insert = xcUserMapper.insert(xcUser);

        //向用户角色关系表新增记录
        XcUserRole xcUserRole = new XcUserRole();
        xcUserRole.setId(UUID.randomUUID().toString());
        xcUserRole.setUserId(userId);
        xcUserRole.setRoleId("17");//学生角色
        xcUserRole.setCreateTime(LocalDateTime.now());
        xcUserRoleMapper.insert(xcUserRole);
        return xcUser;
    }

    //携带令牌查询用户信息
    //http请求方式: GET
    //https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID
    /**
     {
     "openid":"OPENID",
     "nickname":"NICKNAME",
     "sex":1,
     "province":"PROVINCE",
     "city":"CITY",
     "country":"COUNTRY",
     "headimgurl": "https://thirdwx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0",
     "privilege":[
     "PRIVILEGE1",
     "PRIVILEGE2"
     ],
     "unionid": " o6_bmasdasdsad6_2sgVt7hMZOPfL"

     }
     */
    private Map<String,String> getUserinfo(String access_token,String openid){
        String url_template = "https://api.weixin.qq.com/sns/userinfo?access_token=%s&openid=%s";
        String url = String.format(url_template, access_token, openid);
        ResponseEntity<String> exchange = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
        //获取响应的结果
        String result = new String(exchange.getBody().getBytes(StandardCharsets.ISO_8859_1),StandardCharsets.UTF_8);
        //将result转成map
        Map<String,String> map = JSON.parseObject(result, Map.class);
        return map;
    }

    //请求微信获取令牌
    /**
     * 微信接口响应结果
     * {
     * "access_token":"ACCESS_TOKEN",
     * "expires_in":7200,
     * "refresh_token":"REFRESH_TOKEN",
     * "openid":"OPENID",
     * "scope":"SCOPE",
     * "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
     * }
     */
    private Map<String, String> getAccess_token(String code) {
        String url_template = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code";
        //最终的请求路径
        String url = String.format(url_template, appid, secret, code);
        //远程调用此url
        ResponseEntity<String> exchange = restTemplate.exchange(url, HttpMethod.POST, null, String.class);
        //获取响应的结果
        String result = exchange.getBody();
        //将result转成map
        Map<String,String> map = JSON.parseObject(result, Map.class);
        return map;
    }

    //微信 认证方法
    @Override
    public XcUserExt execute(AuthParamsDto authParamsDto) {
        //得到账号
        String username = authParamsDto.getUsername();
        //查询数据库
        XcUser xcUser = xcUserMapper.selectOne(new LambdaQueryWrapper<XcUser>().eq(XcUser::getUsername,username));
        if (xcUser == null) {
            throw new RuntimeException("用户不存在");
        }
        XcUserExt xcUserExt = new XcUserExt();
        BeanUtils.copyProperties(xcUser,xcUserExt);
        return xcUserExt;
    }

}
