import React, { useState } from 'react';
import { Dispatch } from 'redux';
import {
    Input, Button, Modal, Form, Icon, Upload, message
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import {UploadProps, UploadFile, RcFile,} from "antd/es/upload/interface";
import { Map as iMap } from 'immutable';
import { OrderListActions } from '../../redux/actions/order-list-actions';

const FormItem = Form.Item;
window.r = message
let g = window.g;
const uploadUrl = `${g.baseUrl}upload`;

const defaultHeaders = {
    'Accept': 'application/json',
    //'Content-Type': 'application/json',
    //'X-CSRF-Token': g.csrfToken,
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'multipart/form-data'
};

interface Props extends FormComponentProps{
    modalData: iMap<string, string>,
    actions: OrderListActions,
    dispatch: Dispatch,
}
interface RepeatedData {
    receiver_cellphone: string,
    receiver_name: string,
}

interface CState {
    uploading: boolean,
    fileList: UploadFile[]
}

class InputModal extends React.Component<Props, any>{
    constructor(props: Props){
        super(props);
        this.state = {
            uploading: false,
            fileList: [],
            downloadName: '',
            downloadUrl: '',
            repeated: []
        };
    }
    okHandle = ()=>{
        this.props.dispatch(this.props.actions.setModal({visible: 0}));
        this.setState({fileList: []});
    };

    render(){
        let type = this.props.modalData.get('type');
        let upProps: UploadProps = {
            name: 'file',
            data: {
                type: type,
            },
            action: uploadUrl,
            beforeUpload: (file: RcFile, filelist: RcFile[]) => {
                this.setState({uploading: true, fileList: [file]});
                return true
            },
            onChange: (info: any) =>{
                // console.log('onchange', info)
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    let res = info.file.response;
                    if(res && res.status==='error'){
                        message.error(`${info.file.name} ${res.msg}`);
                    }else{
                        if(type === 'handle'){
                            this.setState({
                                downloadName:res.name,
                                downloadUrl: res.url,
                                repeated: res.repeated
                            })
                        }
                        message.success(`${info.file.name} 文件上传成功`);
                    }
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 文件上传失败`);
                }
                this.setState({uploading: false});
            },
            fileList: this.state.fileList
        };

        let icon = (<Icon type="upload"/>);
        if(this.state.uploading){
             icon = (<Icon type="sync" theme="twoTone" twoToneColor="#52c41a" spin />);
        }
        let download:any = '';
        let repeated:any = '';
        if(this.props.modalData.get('type') === 'handle'){
            download = (<div style={{margin:"20px 0 20px 0"}}>
                右键下载处理后文件: <a href={this.state.downloadUrl}>{this.state.downloadName}</a>
                </div>);
            repeated = (
                <ul>
                    <li>重复订单信息：</li>
                    {this.state.repeated.map((item:RepeatedData) => {
                        return (<li>{item.receiver_name} : {item.receiver_cellphone}</li>)
                    })}
                </ul>
            );
        }

        return (
            <Modal
                title={this.props.modalData.get('type')=='input'?"输入订单":'处理订单'}
                width="800px"
                visible={!!this.props.modalData.get('visible')}
                destroyOnClose={true}
                maskClosable={false}
                onOk={()=>this.okHandle()}
                onCancel={()=>{
                    this.props.dispatch(this.props.actions.setModal({visible: 0}));
                    this.setState({fileList: []});
                }}
                confirmLoading={false}
            >
                <Upload {...upProps}>
                    <Button>{icon} 选择文件</Button>
                </Upload>
                {download}
                {repeated}
            </Modal>
        );
    }

}

export default Form.create<Props>()(InputModal);

