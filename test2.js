/**
 * 
 * import pubsub from mypubsub;
 * 
 * ubsub = pubsub.subscribe('event1', callBack);
 * 
 * 
 * pubsub.publish('event1', arr);
 * 
 */

function Pubsub() {
    this.subscribers = {};
}

Pubsub.prototype.subscribe = function (eventName, eventCallBack) {
    const subscriptionObject = {eventName, eventCallBack}
    if(!this.subscribers[eventName]) {
        this.subscribers[eventName] = [];
    }
    this.subscribers[eventName].push(subscriptionObject);

    return () => this.unsubscribe(subscriptionObject)
}

Pubsub.prototype.unsubscribe = function (obj) {
    
    const { eventName, eventCallback } = obj;
    console.log("unsubscribe", obj);
    if(this.subscribers[eventName]) {
        // event was registered
        this.subscribers[eventName] = this.subscribers[eventName].filter((subscriptionObject) => subscriptionObject.eventCallBack !== eventCallback) // may be replace by some event callback identifier
        console.log(this.subscribers[eventName])
    }
}

Pubsub.prototype.publish = function(eventName, eventArgs) {
    if(this.subscribers[eventName]) {
        for(const subscription of this.subscribers[eventName]) {
            subscription.eventCallBack(eventArgs);
        }
    }
}

const pb = new Pubsub();

const ubsub1 = pb.subscribe('e1', function (argument)  {
    console.log("First subscriber", argument);
})

const unsub2 = pb.subscribe('e1', function (argument)  {
    console.log("Second subscriber", argument);
})

pb.publish('e1', 10);

ubsub1();

pb.publish('e1', 20);




//////

function processObject(obj, key, value, keysArray, idx) {
    if(idx == keysArray) return obj;
    if(!obj[key]) {
        obj[key] = (idx == keysArray.length-1) ? value : {};
        if(idx == keysArray.length - 1) return obj;
    }
    console.log(idx, obj)
    if(typeof obj[key] === 'object')
        response = processObject(obj[key], keysArray[idx], value, keysArray, idx+1);
        obj[key] = response;
        return obj;
    return obj;
}

function setValue(obj, str, value) {
    const keysArray = str.split("."); //['a', 'b', 'c']
    keysArray.push(null);
    return processObject(obj, keysArray[0], value, keysArray, 1);

}

const obj = setValue({}, 'a.b.c.d.e', 22);

console.log(JSON.stringify(obj))


// Updated code for updating json with given value i.e. setValue


function processObject1(obj, key, value, keysArray, idx) {
    if(idx == keysArray.length) {
        obj[keysArray[idx-1]] = value;
        return obj;
    }
    if(!obj[key]) {
        obj[key] = {};
    } 
    if(typeof obj[key] === 'object') {
        let response = processObject1(obj[key], keysArray[idx], value, keysArray, idx+1);
        obj[key] = response;
        return obj;
    }
    return obj;
}

function setValue1(obj, str, value) {
    const keysArray = str.split("."); //['a', 'b', 'c']
    // keysArray.push(null);
    return processObject1(obj, keysArray[0], value, keysArray, 1);

}

const obj1 = setValue1({a: {b: {x: 10}}}, 'a.b.c.d.e', 22);

console.log(JSON.stringify(obj1))