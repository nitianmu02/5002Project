import ReactAudioPlayer from "react-audio-player"
import { Button, Checkbox, Form, Input, Select} from 'antd'
import {api} from '../api/api'
import './main.css'
function Main() {

    const onFinish = async (values) => {
        console.log('Received values of form: ', values)
        // const res = await api.get('/index/')
        // const result = response.data 
    }

    return ( 
        <div className="main-content">
            <h2>Google</h2>
            <Form
                name="main"
                className="main-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                    <Form.Item
                        name="text"
                        rules={[{ required: true, message: 'Please input some text!' }]}
                    >
                        <Input/>
                    </Form.Item>
                    
                    <Form.Item name="voice" className="remember">
                        <Checkbox defaultChecked>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{display:'none'}}>
                            Submit
                        </Button>
                    </Form.Item>
                    <ReactAudioPlayer
                        src=""
                        autoPlay
                        controls
                    />
                </Form>
        </div> 
    )
}

export default Main