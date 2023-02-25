import { useState, useEffect } from "react"
import {
    Select,
    Input,
    Upload,
    Button,
    message,
} from 'antd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import r from '../../library/request'

export default () => {
    const [content, setContent] = useState('')
    const getData = async () => {
        const rst = await r(
            '/about',
            {},
            'GET',
        )
        if (rst.code) {
            message.error('请求错误！！！')
        } else {
            setContent(rst.data.content)
        }
    }
    useEffect(() => { getData() }, [])

    const submit = async () => {
        if (!content) {
            message.error('请填写内容！！！')
            return
        }
        const rst = await r(
            '/about',
            {
                content,
            },
            'PUT',
        )
        
        if (rst.code) {
            message.error('上传失败！！！')
        } else {
            message.info('上传成功！！！')
        }
    }

    return (
        <div className="edit">
            <div className="row">
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={(v) => setContent(v)}
                    modules={{
                        toolbar: {
                            container: [
                                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                                [{size: []}],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [{'list': 'ordered'}, {'list': 'bullet'}, 
                                {'indent': '-1'}, {'indent': '+1'}],
                                [
                                    'link',
                                    'image',
                                    // 'video',
                                ],
                                ['clean']
                            ],
                            /*
                            handlers: {
                                'image': imageHandler,
                            },
                            */
                        },
                    }}
                    style={{
                        width: '100%',
                    }}
                />
            </div>
            <div className="row">
                <Button
                    type="primary"
                    onClick={() => submit()}
                >确认</Button>
            </div>
        </div>
    )
}