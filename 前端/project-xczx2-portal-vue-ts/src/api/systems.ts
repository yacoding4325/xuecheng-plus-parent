import { createAPI } from '@/utils/request'
import { SystemDictionary } from '@/entity/system'
import { SystemModule } from '@/store/modules/system'
import { IKVData } from './types'

// type
export type ISystemDictionary = SystemDictionary

// 列表
export async function dictionaryAll(params: any = undefined, body: any = undefined): Promise<ISystemDictionary[]> {
	//const { data } = await createAPI('/system/dictionary/all', 'get', params, body)
	const { data } = await createAPI('http://localhost:63110/system/dictionary/all', 'get', params, body)
	return data
}

// 从 store 中读取定义
export function getDictByCode(code: string): IKVData[] {
	let item: ISystemDictionary[] = SystemModule.dicts.filter((value: ISystemDictionary) => {
		if (value.code == code) {
			return value
		}
	})
	if (item != undefined && item.length > 0) {
		return JSON.parse(item[0].itemValues)
	} else {
		return []
	}
}
