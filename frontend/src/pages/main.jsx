import {useNavigate} from 'react-router-dom'
import ReactAudioPlayer from "react-audio-player"
import { Button, Form, Input, Select} from 'antd'
import {api} from '../api/api'
import './main.css'
function Main() {
    const { TextArea } = Input

    const onFinish = async (values) => {
        console.log('Received values of form: ', values)
        const res = await api.post('/index/',values)
        console.log(res.data);
        // window.location.href = '/'
        // const result = response.data 
    }

    return (
        <div className='main'>
            <section className="main-content">
                <h2>Teyvat</h2>
                <Form
                    name="main"
                    className="main-form"
                    initialValues={{ voice:'Select Voice'}}
                    onFinish={onFinish}
                    
                >
                        <Form.Item
                            name="text"
                            rules={[{ required: true, message: 'Please input some text!' }]}
                        >
                            <TextArea
                                showCount
                                maxLength={100}
                                style={{
                                    height: 120,
                                    resize: 'none',
                                }}
                                placeholder="Input some text"
                                />
                        </Form.Item>
                        
                        <Form.Item 
                            name="voice" 
                            style={{display: 'inline-flex'}}>
                        <Select
                            style={{
                                width: 200,
                            }}
                            options={[
                                {
                                    value: 'Select Voice',
                                    disabled: true,
                                    label: 'Select Voice',
                                },
                                {
                                    value: 'Paimon',
                                    label: 'Paimon',
                                },
                                {
                                    value: 'Miko',
                                    label: 'Miko',
                                },
                                {
                                    value: 'Kazuha',
                                    label: 'Kazuha',
                                },
                                {
                                    value: 'Nahida',
                                    label: 'Nahida',
                                },
                                {
                                    value: 'Hu Tao',
                                    label: 'Hu Tao',
                                },
                                {
                                    value: 'Ayaka',
                                    label: 'Ayaka',
                                },
                                {
                                    value: 'Yoimiya',
                                    label: 'Yoimiya',
                                },
                                {
                                    value: 'Gan Yu',
                                    label: 'Gan Yu',
                                },
                                {
                                    value: 'Mona',
                                    label: 'Mona',
                                },
                                {
                                    value: 'Ei',
                                    label: 'Ei',
                                },
                                
                            ]}
                            />
                        </Form.Item>

                        <Form.Item style={{display: 'inline-flex',marginLeft:'15px', }}>
                            <Button type="primary" htmlType="submit" style={{width:200, borderRadius: 20}}>
                                Transform
                            </Button>
                        </Form.Item>
                        <ReactAudioPlayer
                            src="http://127.0.0.1:8000/static/audio.wav"
                            // autoPlay
                            controls
                            style={{width:'410px'}}
                        />
                    </Form>
            </section> 
        </div>
    )
}

export default Main