import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import * as Constants from '../constants/AppConstants'

import {
    Button,
    Card,
    Row,
    Col,
    Select,
    Pagination
} from "antd";
import {
    PlusOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    MinusCircleFilled
} from '@ant-design/icons';
import {
    ToastContainer,
    toast
} from 'react-toastify';
import { Confirm } from 'semantic-ui-react';

class ListPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [],
            index: null,
            showPagination: false,
            pageNumber: 1,
            confirmModal: false
        };
    }

    componentDidMount() {
        if (localStorage.getItem("linkList")) {
            let list = JSON.parse(localStorage.getItem("linkList"));
            let showPagination = list.length > 5;
            this.setState({list: list,
                                showPagination: showPagination});
        }
    }

    voteUp = (e,index) => {
        if (index !== "") {
            let list = cloneDeep(this.state.list);
            list[index].points += 1;

            for (let i = index; i > 0; i--) {
                if (list[i].points >= list[i - 1].points) {
                    let temp = list[i - 1];
                    list[i - 1] = list[i];
                    list[i] = temp;
                } else
                    break;
            }

            this.setState({list: list});
            this.saveListToLocalStorage(cloneDeep(list));
        }

    };

    voteDown = (e, index) => {
        if (index !== "") {
            let list = cloneDeep(this.state.list);
            if (list[index].points !== 0)
                list[index].points -= 1;

            for (let i = index; i < list.length; i++) {
                if (i + 1 < list.length) {
                    if (list[i].points < list[i + 1].points) {
                        let temp = list[i + 1];
                        list[i + 1] = list[i];
                        list[i] = temp;
                    } else
                        break;
                }
            }

            this.setState({list: list});
            this.saveListToLocalStorage(cloneDeep(list));
        }
    };

    saveListToLocalStorage = (list) => {
        list.sort(function(a,b){
            return new Date(b.createdDate) - new Date(a.createdDate);
        });
        localStorage.setItem("linkList", JSON.stringify(list));
    }

    openAddItemPage = () => {
        this.saveListToLocalStorage(cloneDeep(this.state.list))
        this.props.history.push('/addItemPage');
    };

    handleDropdownChange = (value) => {
        let list = cloneDeep(this.state.list);
        if (value === Constants.VALUES.less_voted) {
            list.sort(function(a,b){
                return parseInt(a.points)  - parseInt(b.points);
            })
        } else {
            list.sort(function(a,b){
                return parseInt(a.points)  - parseInt(b.points);
            }).reverse()
        }

        this.setState({list:list});
        return list;
    };

    showDeleteButton = (i) => {
        this.setState({index: i});
    }

    hideDeleteButton = () => {
        this.setState({index: null});
    }

    onPageNumberChange = (value) => {
       this.setState({pageNumber: value});
    }

    deleteLink = (index) => {
        let list = cloneDeep(this.state.list);
        toast.success(list[index].linkName.toUpperCase() + " is deleted", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true
        });
        list.splice(index, 1);
        let showPagination = list.length > 5
        //sayfada link kalmazsa bir önceki sayfaya atar.
        let pageNumber = list.length % 5 === 0 && this.state.pageNumber !== 1 ?
            cloneDeep(this.state.pageNumber) - 1 :
            cloneDeep(this.state.pageNumber)
        this.setState({list: list,
                            showPagination: showPagination,
                            pageNumber: pageNumber});
        this.saveListToLocalStorage(cloneDeep(list));
    }

    prepareListComponents = (list, pageNumber) => {
        let tempList = list;
        //sayfa numarasına göre indexleme
        let offset = ((pageNumber - 1) * 5);
        if (pageNumber) {
            tempList = tempList.slice(offset, offset + 5);
        }
        let cardList = tempList.map((link,idx) => {
            let index = offset + idx;
            return <div key={index} onMouseEnter={() => this.showDeleteButton(index)} onMouseLeave={() => this.hideDeleteButton()}>
                <Row>
                    <Col>
                        <Card className="point-card-style">
                            <Col>
                                <div className="point-style">
                                    {link.points}
                                </div>
                            </Col>
                            <Col>
                                <div className={"points-text"}>
                                    {Constants.LABELS.points}
                                </div>
                            </Col>
                        </Card>
                    </Col>

                    <Col>
                        <Card className={"content-card-style"} hoverable={true}>
                            <Row justify="space-between">
                                <Col>
                                    <div className={"link-name"}>
                                        {link.linkName}
                                    </div>
                                    <div>
                                        ({link.url})
                                    </div>
                                </Col>
                                <Col>
                                    <Button className="delete-button"
                                            type="text"
                                            hidden={index !== this.state.index}
                                            onClick={() => this.setState({confirmModal: true})}>
                                        <MinusCircleFilled />
                                    </Button>
                                    <Confirm
                                        open={this.state.confirmModal}
                                        onConfirm={() => this.deleteLink(index)}
                                        onCancel={() => this.setState({confirmModal: false})}
                                        header={Constants.ALERTS.delete_item}
                                        content={link.linkName.toUpperCase()}
                                    />
                                </Col>
                            </Row>
                            <Col>
                                <div className="vote-buttons">
                                <Row>
                                    <Col>
                                        <Button type="text"
                                                className="vote-buttons"
                                                onClick={(e) => this.voteUp(e,index)}>
                                            <ArrowUpOutlined />
                                            {Constants.LABELS.up_vote}
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button type="text"
                                                className="vote-buttons"
                                                onClick={(e) => (this.voteDown(e,index))}>
                                            <ArrowDownOutlined />
                                            {Constants.LABELS.down_vote}
                                        </Button>
                                    </Col>
                                </Row>
                                </div>
                            </Col>
                        </Card>
                    </Col>
                </Row>
                <br/>
            </div>
        })

        return cardList
    };

    render() {
        return (
            <div className="content">
                <ToastContainer/>
                <Button className="submit-button"
                        block
                        size={"large"}
                        icon={<PlusOutlined/>}
                        onClick={this.openAddItemPage}>
                    {Constants.BUTTONS.submit_a_link}
                </Button>

                
                <div className="order-by">
                    <Select onChange={this.handleDropdownChange} style={{ width: '50%', backgroundColor: 'whitesmoke' }} placeholder="Order By">
                        <Select.Option value={Constants.VALUES.most_voted}>{Constants.LABELS.most_voted}</Select.Option>
                        <Select.Option value={Constants.VALUES.less_voted}>{Constants.LABELS.less_voted}</Select.Option>
                    </Select>
                </div>
                {this.prepareListComponents(this.state.list, this.state.pageNumber)}
                {this.state.showPagination && <Pagination total={(Math.floor(this.state.list.length / 5) + 1) * 10} onChange={this.onPageNumberChange}/>}
            </div>


        );
    }
}

export default ListPage