import React, { Component } from 'react';
import getBooks from '../../services/dictionary';
import Card from '../Card';
import { Input, Button } from 'antd';

import s from './CardList.module.scss';

const { Search } = Input;

class CardList extends Component {
    state = {
        value: '',
        label: '',
        data: [],
        startIndex: 0,
        requestStep: 40,
        btnLoadMore: false,
        loadings: [],
    }

    enterLoading = index => {
        this.setState(({ loadings }) => {
          const newLoadings = [...loadings];
          newLoadings[index] = true;

          return {
            loadings: newLoadings,
          };
        });
        setTimeout(() => {
            this.setState(({ loadings }) => {
                const newLoadings = [...loadings];
                newLoadings[index] = false;

                return {
                    loadings: newLoadings,
                };
            });
        }, 1000);
    };

    hendleInputChange = (e) => {
        this.setState({
            value: e.target.value,
        })
    }

    handleSubmitForm = async () => {
        let {value, startIndex, requestStep} = this.state;
        startIndex = 0;
        const getBook = await getBooks(value, startIndex);

        if(!getBook.error){
            this.setState ({
                data: getBook.items || [],
                startIndex: startIndex,
                btnLoadMore: getBook.items.length < requestStep ? false : true,
            })
        }
    }

    hendleLoadMore = async () =>{
        this.enterLoading(0)
        let {value, startIndex, requestStep} = this.state;
        startIndex = startIndex + requestStep;
        const getBook = await getBooks(value, startIndex);

        this.setState ({
            data: this.state.data.concat(getBook.items),
            startIndex: startIndex,
            btnLoadMore: getBook.items.length < requestStep ? false : true,
        })
    }

    getBtnLoadMore = ({btnLoadMore}) => {
        if(btnLoadMore) {
            const { loadings } = this.state;
             return(
                <Button type="primary" loading={loadings[0]} onClick={this.hendleLoadMore}>
                    Load more
                </Button>
            )
        };
    };

    render () {
        const { data } = this.state;
        return (
            <div className={s.cardListWrap}>
                <div className={s.form}>
                    <Search
                        placeholder="input search text"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onChange={this.hendleInputChange}
                        onSearch={this.handleSubmitForm}
                    />
                </div>

                <div className={s.cardsBlock}>
                    {
                        data.map(({volumeInfo, id}) => (
                            <Card
                                key = {id}
                                authors = {volumeInfo.authors}
                                title = {volumeInfo.title}
                                imageLinks = {volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : ''}
                                item = {volumeInfo}
                            />
                        ))
                    }
                </div>
                {
                    this.getBtnLoadMore(this.state)
                }
            </div>
        )
    }
}

export default CardList;