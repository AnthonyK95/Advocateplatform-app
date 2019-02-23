//The device store will handle the adding and deleting of the containers
//It will also allow the user manage the information of the containers

// Exporting the deviceStore => Not active

const deviceStore = {
    data:{
        listofdevices:[]
    },
    methods:{
        // Creating the new devices
        createInstance(name){
            deviceStore.data.listofdevices.push(name);
        },
    },    
}

export default deviceStore;