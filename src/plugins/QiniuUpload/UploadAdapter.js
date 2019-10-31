import http from '@hlj/hlj-fetch-new'
import * as qiniuV2 from 'qiniu-js'

/**
 * 基于七牛2.0的文件上传通用方法
 */
export const upload = async file => {
	const config = {
		useCdnDomain: true
	}
	const putExtra = {
		fname: '',
		params: {},
		mimeType: null
	}

	const { uptoken } = await http(
		'/p/wedding/home/APIUtils/image_upload_token',
		{
			dataType: 'json'
		}
	)
	const observable = qiniuV2.upload(file, null, uptoken, putExtra, config)

	return new Promise(resolve => {
		observable.subscribe({
			next(res) {},
			error(err) {
				resolve({ success: false })
			},
			complete(res) {
				// todo, domain use https
				const { domain, image_path } = res
				const url = domain + image_path
				resolve({ default: url })
			}
		})
	})
}

export default class UploadAdapter {
	constructor(loader) {
		this.loader = loader
		this.uploader = null
	}
	// 通过这个方法，会把上传到服务器的文件地址展示到编辑器中
	async upload() {
		const file = await this.loader.file
		return upload(file)
	}
	// 这个方法会在编辑器销毁时候，终止文件上传
	abort() {
		if (this.uploader) {
			this.uploader.unsubscribe()
		}
	}
}
