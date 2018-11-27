

// Searching for the incoming data from the consent form
exports.update = (object,find,replace)=>{

    Object.keys(object).forEach(function(dataforudpate){
        if(object[dataforudpate]&&typeof object[dataforudpate] === 'object'){
            return update(object,find,replace)
        }
        if(object[dataforudpate] === find){
            object[dataforudpate] = replace
        }
           
     })
}