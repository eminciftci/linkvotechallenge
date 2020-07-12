import React from 'react';
import {
    Button,
    Form,
    Input
} from "antd";
import {
    ToastContainer,
    toast
} from 'react-toastify';
import { ArrowLeftOutlined } from '@ant-design/icons';
import * as Constants from '../constants/AppConstants'
import 'react-toastify/dist/ReactToastify.css';
import *as Util from '../util/Util';

const AddItemPage = (({history}) => {

    const [form] = Form.useForm();

    const onFinish = (values) => {
        let list = localStorage.getItem("linkList") ? JSON.parse(localStorage.getItem("linkList")): [];
        let object = values;
        object[Constants.FIELDS.points] = 0;
        object[Constants.FIELDS.created_date] = new Date();
        list = Util.addTopOfList(object, list);
        localStorage.setItem("linkList", JSON.stringify(list));
        toast.success(object.linkName.toUpperCase() + " is added", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true
        });
        form.resetFields();
    };

    const returnToListPage = () => {
        history.push('/');
    };

    return(
        <div className="content">
            <ToastContainer/>
            <Button type="text"
                    onClick={returnToListPage}>
                <ArrowLeftOutlined/>
                {Constants.LABELS.return_to_list}
            </Button>
            <h1 className="form-header">{Constants.LABELS.add_new_link}</h1>
            <Form layout="vertical"
                  name="register"
                  form={form}
                  onFinish={onFinish}
                  scrollToFirstError>
                <Form.Item
                    label={Constants.LABELS.link_name}
                    name={Constants.FIELDS.link_name}
                    rules={Constants.VALIDATION_RULES.link_name_rules}>
                    <Input placeholder={Constants.PLACEHOLDERS.link_name_placeholder}/>
                </Form.Item>
                <Form.Item
                    label= {Constants.LABELS.link_url}
                    name= {Constants.FIELDS.url}
                    rules={Constants.VALIDATION_RULES.url_rules}>
                    <Input placeholder={Constants.PLACEHOLDERS.url_placeholder}/>
                </Form.Item>
                <Form.Item style={{textAlign:"right"}}>
                    <Button className="form-button"
                            size="large"
                            shape="round"
                            htmlType="submit">
                        {Constants.BUTTONS.add}
                    </Button>
                </Form.Item>
            </Form>
        </div>
        )

})

export default AddItemPage;