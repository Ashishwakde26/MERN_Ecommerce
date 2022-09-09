

class APIfeatures {
    constructor(query, querystr){
        this.query = query;
        this.querystr = querystr;
    }

    search() {
        const keyword = this.querystr.keyword ? {
            name: {
                $regex: this.querystr.keyword,
                $options: 'i'
            }
        } : {}

        console.log(keyword)
     //   console.log(this.querystr);
        this.query = this.query.find({...keyword});
        return this;
    }

    filter() {
        const querycopy = {...this.querystr}


        const removeField = [ 'keyword', 'limit', 'page'];

        removeField.forEach(el => ( delete querycopy[el]))

        
        this.query = this.query.find({...querycopy})
        return this;

    }

    pagination(resperpage) {
        const currenpage = this.querystr.page || 1
        const skip = currenpage * (resperpage - 1)

        this.query = this.query.limit(resperpage).skip(skip)
        return this;
    }
}

module.exports = APIfeatures