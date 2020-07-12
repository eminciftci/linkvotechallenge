import React, { useState, useEffect } from 'react';
import * as Constants from '../constants/AppConstants'
import cloneDeep from 'lodash/cloneDeep';

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
import *as Util from '../util/Util';

const ListPage = (({history}) => {

    const [list, setList] = useState([]);
    const [index, setIndex] = useState(null);
    const [showPagination, setShowPagination] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [confirmModal, setConfirmModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(0);

    useEffect(() => {
        if (localStorage.getItem("linkList")) {
            let initialList = JSON.parse(localStorage.getItem("linkList"));
            let showPage = initialList.length > 5;
            setList([...initialList]);
            setShowPagination(showPage);
        }
    }, [])


    const voteUp = (e,index) => {
        debugger;
        if (index !== "") {
            let sortedList = Util.voteUpSorting(list, index);
            setList([...sortedList]);
            saveListToLocalStorage(sortedList);
        }

    };

    const voteDown = (e, index) => {
        if (index !== "") {
            let sortedList = Util.voteDownSorting(list, index);
            setList([...sortedList]);
            saveListToLocalStorage(sortedList);
        }
    };

    const saveListToLocalStorage = (list) => {
        list.sort(function(a,b){
            return new Date(b.createdDate) - new Date(a.createdDate);
        });
        localStorage.setItem("linkList", JSON.stringify(list));
    }

    const openAddItemPage = () => {
        saveListToLocalStorage(list)
        history.push('/addItemPage');
    };

    const handleDropdownChange = (value) => {
        let sortedList;
        if (value === Constants.VALUES.less_voted) {
            sortedList = Util.sortAscending(list);
        } else {
            sortedList = Util.sortDescending(list);
        }
        setList([...sortedList]);
        return list;
    };

    const showDeleteButton = (i) => {
        setIndex(i);
    }

    const hideDeleteButton = () => {
        setIndex(null);
    }

    const onPageNumberChange = (value) => {
        setPageNumber(value);
    }

    const deleteLink = (index) => {
        debugger;
        let clonedList = cloneDeep(list);
        toast.success(clonedList[index].linkName.toUpperCase() + " is deleted", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true
        });
        clonedList.splice(index, 1);
        let showPage = clonedList.length > 5
        //sayfada link kalmazsa bir önceki sayfaya atar.
        let pageNumberLocal = clonedList.length % 5 === 0 && pageNumber !== 1 ?
            pageNumber - 1 :
            pageNumber
        setList([...clonedList]);
        setShowPagination(showPage);
        setPageNumber(pageNumberLocal);
        setConfirmModal(false);
        setDeleteIndex(0);
        saveListToLocalStorage(clonedList);
    }

    const prepareListComponents = (list, pageNumber) => {
        let tempList = list;
        //sayfa numarasına göre indexleme
        let offset = ((pageNumber - 1) * 5);
        if (pageNumber) {
            tempList = tempList.slice(offset, offset + 5);
        }
        let cardList = tempList.map((link,idx) => {
            let localIndex = offset + idx;
            return <div key={localIndex} onMouseEnter={() => showDeleteButton(localIndex)} onMouseLeave={() => hideDeleteButton()}>
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
                                            hidden={localIndex !== index}
                                            onClick={() => {
                                                setConfirmModal(true);
                                                setDeleteIndex(localIndex);
                                            }}>
                                        <MinusCircleFilled />
                                    </Button>
                                    <Confirm
                                        open={confirmModal}
                                        onConfirm={() => deleteLink(deleteIndex)}
                                        onCancel={() => setConfirmModal(false)}
                                        header={Constants.ALERTS.delete_item}
                                        content={list[deleteIndex].linkName !== undefined ? list[deleteIndex].linkName.toUpperCase(): ""}
                                    />
                                </Col>
                            </Row>
                            <Col>
                                <div className="vote-buttons">
                                    <Row>
                                        <Col>
                                            <Button type="text"
                                                    className="vote-buttons"
                                                    onClick={(e) => voteUp(e,localIndex)}>
                                                <ArrowUpOutlined />
                                                {Constants.LABELS.up_vote}
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button type="text"
                                                    className="vote-buttons"
                                                    onClick={(e) => (voteDown(e,localIndex))}>
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

    return(
        <div className="content">
            <ToastContainer/>
            <Button className="submit-button"
                    block
                    size={"large"}
                    icon={<PlusOutlined/>}
                    onClick={openAddItemPage}>
                {Constants.BUTTONS.submit_a_link}
            </Button>


            <div className="order-by">
                <Select onChange={handleDropdownChange} style={{ width: '50%', backgroundColor: 'whitesmoke' }} placeholder="Order By">
                    <Select.Option value={Constants.VALUES.most_voted}>{Constants.LABELS.most_voted}</Select.Option>
                    <Select.Option value={Constants.VALUES.less_voted}>{Constants.LABELS.less_voted}</Select.Option>
                </Select>
            </div>
            {prepareListComponents(list, pageNumber)}
            {showPagination && <Pagination total={(Math.floor(list.length / 5) + 1) * 10} onChange={onPageNumberChange}/>}
        </div>


    );

})


export default ListPage