import React, { Component } from 'react';
import s from './Card.module.scss';
import image from './assets/image.jpg';
import { Button } from 'antd';

class Card extends Component {
    state = {
        popUpBlock: false
    }

    getPopUpBlock = () => {
        return (
            <div className={s.popUpBlock}>
                <div className={s.popUp}>
                    <Button 
                        className={s.popUpCloseBtn}
                        type="primary" 
                        onClick={this.hendleClickPopUp}
                    >+</Button>
                    <div className={s.bookInfo}>
                        <img className={s.cardImg} src={this.props.imageLinks || image} alt="img"/>
                        <p>Author(s): {this.props.authors ? this.props.authors.join(', ') : ''}</p>
                        <p>Name of the book: {this.props.title}</p>
                        <p className={s.description}>
                            <span>Book description:</span>
                            {this.props.item.description}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    hendleClickCard = (e) => {
        this.setState({
            popUpBlock: true,
        })
    }

    hendleClickPopUp = (e) => {
        this.setState({
            popUpBlock: false,
        })
    }

    render() {
        return (
            <>
                {this.state.popUpBlock ? this.getPopUpBlock() : ''}
                <div 
                    className={s.cardItem} 
                    onClick={this.hendleClickCard}
                >
                    <div className={s.cardImgBlock}>
                        <img className={s.cardImg} src={this.props.imageLinks || image} alt="img"/>
                    </div>
                    <p className={s.cardAuthors} >{this.props.authors ? this.props.authors.join(', ') : ''}</p>
                    <p className={s.cardTitle} >{this.props.title}</p>
                </div>
            </>
        )
    }
}

export default Card;