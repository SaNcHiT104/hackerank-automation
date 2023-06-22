//puppeteer works basically on promises 
let puppeteer = require('puppeteer')
let browserLaunchedPromise = puppeteer.launch({ //browser launch krta hai // chromium
    headless:false, // visible hoga 
    defaultViewport:null, // for full screen
    rgs:['-start-maximized']
})
browserLaunchedPromise.then(function(browserInstance){
    //return browserInstance; // for 1st tab
    let newtab = browserInstance.newPage() // for new tab
    return newtab
}).then(function(newpage){ //  working on new tab
    console.log('New tab opened ')
    let pageOpenedPromise = newpage.goto('https://www.pepcoding.com/resources/')
    return pageOpenedPromise // pepcoding opened
}).then(function(webPage){
    console.log("page opened")
})