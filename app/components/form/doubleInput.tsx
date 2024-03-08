"use client"
import { Input, Space } from 'antd';

interface DoubleInputAppProps {
    data?:any
} 
const DoubleInputApp: React.FC<DoubleInputAppProps>= ({data}) => {


    return(
        <Space direction="vertical">
        <Input addonBefore={data.PostalCode} defaultValue={data.Address}  className='justify-content'/>
    </Space>
    )
    
    };

export default DoubleInputApp;