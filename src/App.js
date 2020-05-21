import React, {Component} from "react";
import "./App.css";
import {connect} from "react-redux";
import {addTextItemFetchData, changeInputValue, refreshState, textItemFetchData} from "./redux/reducer";
import CacheManager from "./cache";

class App extends Component {

    constructor() {
        super()
        this.state = {
            textItems: []
        }
        this.cache = new CacheManager()
    }

    refreshState = async () => {
        const oldState = await this.cache.readData('state')
        console.log(oldState)
        if (!oldState) {
            const {textItems} = this.state
            this.cache.writeData('state', {textItems})
            this.cache.removeData('state')
            return
        }
        await this.props.refreshState(oldState)
    }

    componentWillReceiveProps = nextProps => {
        const {textItems} = nextProps
        this.setState({
            textItems: textItems.forEach(item => {
                if (item.idText >= this.nextId) {
                    this.nextId = item.idText + 1;
                }
            })
        })
    }

    componentWillMount = () => {
        const {textItems} = this.props
        this.setState({textItems})
        this.refreshState()
    }

    componentDidMount() {
        this.props.fetchData("/api/data")
    }

    onChangeInputValue = (e) => {
        this.props.onChangedInputValue(e.currentTarget.value)
    }

    nextId = 1
    addTextItem = () => {
        let newItem = {idText: this.nextId, text: this.props.inputValue}
        this.props.onAddNewTextItem("/api/data", newItem)
        this.props.onChangedInputValue("")
        this.nextId++
    }

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.addTextItem()
        }
    }

    render() {

        return (<>
                <div>
                    <input type="text" value={this.props.inputValue}
                           onChange={this.onChangeInputValue} onKeyPress={this.onKeyPress}/>
                    <button onClick={this.addTextItem}>Create</button>
                    {this.props.textItems &&
                    <ul>
                        {this.props.textItems.map((t, index) =>
                            <li key={index}>{t.idText} - {t.text}</li>
                        )}
                    </ul>
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        textItems: state.textItems,
        inputValue: state.inputValue,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData(url) {
            dispatch(textItemFetchData(url))
        },
        onChangedInputValue(inputValue) {
            dispatch(changeInputValue(inputValue))
        },
        onAddNewTextItem(url, newTextItem) {

            dispatch(addTextItemFetchData(url, newTextItem))
        },
        refreshState: state => dispatch(refreshState(state))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
