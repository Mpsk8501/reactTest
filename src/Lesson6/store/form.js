import {observable, computed, action} from 'mobx';

export default class {
    constructor(rootStore) {
        this.rootStore = rootStore
    }

    @observable formData = {
        name: {
            label: 'Name',
            value: '',
            validator: val => /^[aA-zZаА-яЯ ]{2,}$/.test(val),
            error: 'Latin or cyrillic two or more',
            valid: null
        },
        email: {
            label: 'Email',
            value: '',
            validator: val => /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(val),
            error: 'valid e=mail',
            valid: null
        },
        phone: {
            label: 'Phone',
            value: '',
            validator: val => /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(val),
            error: 'number 7-15',
            valid: null
        },
    };

    @computed get apply() {
        return !Object.values(this.formData).every(field => field.valid)
    }

    @computed get data() {
        let data = {};

        for (let name in this.formData) {
            data[name] = this.formData[name].value
        }
        return data
    }

    @action change(name, value) {
        let data = this.formData[name];
        data.value = value;
        data.valid = data.validator(data.value);
    }
}



