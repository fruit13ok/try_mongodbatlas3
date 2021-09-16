console.log("Sanity Check: JS is working!");
// routes for database CRUD
let backendRouteSaveUser = new URL("http://localhost:8000/save-user");
let backendRouteSaveResultBacklink = new URL("http://localhost:8000/save-resultbacklink");
let backendRouteSaveResultRelatedSearch = new URL("http://localhost:8000/save-resultrelatedsearch");
let backendRouteAllResultBacklink = new URL("http://localhost:8000/all-resultbacklink");
let backendRouteAllResultRelatedSearch = new URL("http://localhost:8000/all-resultrelatedsearch");
let backendRouteFindUserResult = new URL("http://localhost:8000/find-userresult");

// POST request to DB to save new user and display when save complete
const saveUser = async (backendRoute, formObj) => {
    try {
        const response = await fetch(backendRoute, {
            method: 'POST', 
            body: JSON.stringify(formObj),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        let json = await response.json();
        console.log('json',json);
        let mList = document.getElementById('result-list');
        mList.innerHTML = '';
        let pre = document.createElement('pre');
        pre.innerHTML = JSON.stringify(json, null, 4);
        mList.appendChild(pre);
    }catch (error) {
        console.log(error);
    }
};

// POST request to DB to save new backlink result of given / existing user and display when save complete
const saveResultBacklink = async (backendRoute, formObj) => {
    try {
        const response = await fetch(backendRoute, {
            method: 'POST', 
            body: JSON.stringify(formObj),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        let json = await response.json();
        console.log('json',json);
        let mList = document.getElementById('result-list');
        mList.innerHTML = '';
        let pre = document.createElement('pre');
        pre.innerHTML = JSON.stringify(json, null, 4);
        mList.appendChild(pre);
    }catch (error) {
        console.log(error);
    }
};

// POST request to DB to save new related search result of given / existing user and display when save complete
const saveResultRelatedSearch = async (backendRoute, formObj) => {
    try {
        const response = await fetch(backendRoute, {
            method: 'POST', 
            body: JSON.stringify(formObj),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        let json = await response.json();
        console.log('json',json);
        let mList = document.getElementById('result-list');
        mList.innerHTML = '';
        let pre = document.createElement('pre');
        pre.innerHTML = JSON.stringify(json, null, 4);
        mList.appendChild(pre);
    }catch (error) {
        console.log(error);
    }
};

// GET request to DB find all backlink result
const getAllResultBacklink = async (backendRoute) => {
    try {
        const response = await fetch(backendRoute, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        let json = await response.json();
        console.log('json',json);
        let mList = document.getElementById('result-list');
        mList.innerHTML = '';
        let ul = document.createElement('ul');
	    ul.id = 'list-group';
	    ul.className = 'list-group';
        mList.appendChild(ul);
        for(let i=0; i<json.length; i++){
            let li = document.createElement('li');
	        li.className = 	'list-group-item';
            ul.appendChild(li);
            let pre = document.createElement('pre');
            pre.innerHTML = JSON.stringify(json[i], null, 4);
            li.appendChild(pre);
        }
    }catch (error) {
        console.log(error);
    }
};

// GET request to DB find all related search result
const getAllResultRelatedSearch = async (backendRoute) => {
    try {
        const response = await fetch(backendRoute, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        let json = await response.json();
        console.log('json',json);
        let mList = document.getElementById('result-list');
        mList.innerHTML = '';
        let ul = document.createElement('ul');
	    ul.id = 'list-group';
	    ul.className = 'list-group';
        mList.appendChild(ul);
        for(let i=0; i<json.length; i++){
            let li = document.createElement('li');
	        li.className = 	'list-group-item';
            ul.appendChild(li);
            let pre = document.createElement('pre');
            pre.innerHTML = JSON.stringify(json[i], null, 4);
            li.appendChild(pre);
        }
    }catch (error) {
        console.log(error);
    }
};

// POST request to DB given user's results
const getFindUserResult = async (backendRoute, formObj) => {
    try {
        const response = await fetch(backendRoute, {
            method: 'POST', 
            body: JSON.stringify(formObj), 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        let json = await response.json();
        console.log('json',json);
        let mList = document.getElementById('result-list');
        mList.innerHTML = '';
        let ul = document.createElement('ul');
	    ul.id = 'list-group';
	    ul.className = 'list-group';
        mList.appendChild(ul);
        for(let i=0; i<json.length; i++){
            let li = document.createElement('li');
	        li.className = 	'list-group-item';
            ul.appendChild(li);
            let pre = document.createElement('pre');
            console.log('json[i]',json[i]);     
            pre.innerHTML = JSON.stringify(json[i], null, 4);
            li.appendChild(pre);
        }
    }catch (error) {
        console.log(error);
    }
};

// submit button clicked, pass form data into helper functions and invoke it
$(document).ready(function(){
    $("#btnnewuser").click(function(){
        let formArr = $("#form1").serializeArray();
        let formObj = formArr.reduce((map, obj) => {
            map[obj.name] = obj.value;
            return map;
        }, {});
        document.getElementById('result-list').innerHTML = 
        '<p style="color:blue;font-size:46px;"><strong> ... Accessing DB please wait ... </strong></p>';
	    console.log('formObj',formObj);
        saveUser(backendRouteSaveUser, formObj);
    });
    $("#btnnewresultbacklink").click(function(){
        let formArr = $("#form2").serializeArray();
        let formObj = formArr.reduce((map, obj) => {
            map[obj.name] = obj.value;
            return map;
        }, {});
        document.getElementById('result-list').innerHTML = 
        '<p style="color:blue;font-size:46px;"><strong> ... Accessing DB please wait ... </strong></p>';
        saveResultBacklink(backendRouteSaveResultBacklink, formObj);
    });
    $("#btnresultrelatedsearch").click(function(){
        let formArr = $("#form2").serializeArray();
        let formObj = formArr.reduce((map, obj) => {
            map[obj.name] = obj.value;
            return map;
        }, {});
        document.getElementById('result-list').innerHTML = 
        '<p style="color:blue;font-size:46px;"><strong> ... Accessing DB please wait ... </strong></p>';
        saveResultRelatedSearch(backendRouteSaveResultRelatedSearch, formObj);
    });

    $("#btnshowresultbacklink").click(function(){
        document.getElementById('result-list').innerHTML = 
        '<p style="color:blue;font-size:46px;"><strong> ... Accessing DB please wait ... </strong></p>';
        getAllResultBacklink(backendRouteAllResultBacklink);
    });

    $("#btnshowresultrelatedsearch").click(function(){
        document.getElementById('result-list').innerHTML = 
        '<p style="color:blue;font-size:46px;"><strong> ... Accessing DB please wait ... </strong></p>';
        getAllResultRelatedSearch(backendRouteAllResultRelatedSearch);
    });

    $("#btnfounduserresult").click(function(){
        let formArr = $("#form2").serializeArray();
        let formObj = formArr.reduce((map, obj) => {
            map[obj.name] = obj.value;
            return map;
        }, {});
        document.getElementById('result-list').innerHTML = 
        '<p style="color:blue;font-size:46px;"><strong> ... Accessing DB please wait ... </strong></p>';
        getFindUserResult(backendRouteFindUserResult, formObj);
    }); 
});