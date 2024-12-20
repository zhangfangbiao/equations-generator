import { Button, Form, InputNumber, Select } from 'antd'
import { useRef, useState } from 'react'
import { Flag, FromData, Info } from './types'
import { getInfo, LINE } from './helpers'
import html2canvas from 'html2canvas'

function App() {
    const [list, setList] = useState<Info[]>([])
    const onfinish = (values: FromData) => {
        const counts = LINE * 3
        const list = Array(counts).fill(0).map((_v, i) => {
            return {
                key: i,
                ...getInfo(values),
            }
        })
        setList(list)
    }

    const ref = useRef<HTMLDivElement>(null)
    const onPrint = () => {
        html2canvas(ref.current).then(canvas => {
            const imgData = canvas.toDataURL('image/png')
            const link = document.createElement('a')
            link.href = imgData
            link.download = 'test'
            link.click()
        })
    }

    return (
        <div>
            <Form onFinish={onfinish}>
                <Form.Item name='max' rules={[{ required: true, message: '请输入参与运算的最大值'}]}>
                    <InputNumber placeholder='请输入参与运算的最大值' style={{ width: '30rem' }} />
                </Form.Item>
                <Form.Item name='flags' rules={[{ required: true, message: '请选择运算符'}]}>
                    <Select placeholder='请选择运算符' mode='multiple' style={{ width: '30rem' }} >
                        <Select.Option key={Flag.plus} >{Flag.plus}</Select.Option>
                        <Select.Option key={Flag.minus} >{Flag.minus}</Select.Option>
                        <Select.Option key={Flag.multiply} >{Flag.multiply}</Select.Option>
                        <Select.Option key={Flag.divide} >{Flag.divide}</Select.Option>
                    </Select>
                </Form.Item>
                <Button htmlType='submit' type='primary'>生成</Button>
                <Button onClick={onPrint} disabled={list.length === 0} type='primary' style={{ marginLeft: '1rem' }}>打印</Button>
            </Form>
            <div className='renders' ref={ref}>
                {
                    list.map((v, i) => {
                        return (
                            <div key={i} className='item'>
                                <div className='first'>{v.first}</div>
                                <div className='flag'>{v.flag}</div>
                                <div className='second' >{v.second}</div>
                                <div className='equal'>=</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default App
