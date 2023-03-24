/**
 * 数据字典
 */
export interface SystemDictionary {
	/**
	 * 数据字典代码
	 */
	code: string;
	/**
	 * id标识
	 */
	dicId: number;
	/**
	 * 数据字典项--json格式[{
	 * "sd_name": "低级",
	 * "sd_id": "200001",
	 * "sd_status": "1"
	 * }, {
	 * "sd_name": "中级",
	 * "sd_id": "200002",
	 * "sd_status": "1"
	 * }, {
	 * "sd_name": "高级",
	 * "sd_id": "200003",
	 * "sd_status": "1"
	 * }]
	 */
	itemValues: string;
	/**
	 * 数据字典名称
	 */
	name: string;
}
