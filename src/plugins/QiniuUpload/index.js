import UploadAdapter from './UploadAdapter'

function QiniuAdapterPlugin(editor) {
	editor.plugins.get('FileRepository').createUploadAdapter = loader => {
		// Configure the URL to the upload script in your back-end here!
		return new UploadAdapter(loader)
	}
}

export default QiniuAdapterPlugin
