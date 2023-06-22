const loginLink = "https://www.hackerrank.com/auth/login";
let puppeteer = require("puppeteer");
let email = "vahan27107@shackvine.com";
let password = "1234567890";
const codeFile = require("./code");
let page;
let browserLaunched = puppeteer.launch({
  // opening the browser
  headless: false,
  defaultViewport: null,
  rgs: ["--start-maximized"],
});
browserLaunched
  .then(function (browserInstance) {
    let newTab = browserInstance.newPage(); // browser opened in new tab
    return newTab;
  })
  .then(function (newPage) {
    page = newPage; //to extract html,global variable is created
    let pageOpen = newPage.goto(loginLink); // gone on the new link
    return pageOpen;
  })
  .then(function () {
    //email written
    let TypeEmailPromise = page.type("input[id='input-1']", email, {
      delay: 100,
    }); //(location,what to type,time duration)
    return TypeEmailPromise;
  })
  .then(function () {
    // pass written
    let typePassPromise = page.type("input[id='input-2']", password, {
      delay: 50,
    });
    return typePassPromise;
  })
  .then(function () {
    // clicking the login button
    let clickPromise = page.click('button[data-analytics="LoginPassword"]', {
      delay: 100,
    });
    return clickPromise; //we are waiting for the page to open then to access algorithm box
  })
  .then(function () {
    let algorithmPromise = waitAndClick(
      '.topic-card a[data-attr1="algorithms"]',
      page
    ); //it will wait
    // then click the algo button
    return algorithmPromise;
  })
  .then(function () {
    let getTowarmupPRomise = waitAndClick('input[value="warmup"]', page); // clicking the warmup on right for set of questions
    return getTowarmupPRomise;
    // querySelector - $ and querySelectorAll - $$(get all the details of a class)
  })
  .then(function () {
    let chalangeArr = page.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",
      { delay: 100 }
    );
    // array of all the solve challanges button
    return chalangeArr;
  })
  .then(function (questionArr) {
    console.log("No of question " + questionArr.length);
    let questionWillBeSolved = questionSolver(
      page,
      questionArr[0],
      codeFile.answers[0]
    );
  });
//entered in the first question
//we have to write the code in test input, because in the editor,auto complete will alter the code and error

function waitAndClick(selector, cpage) {
  return new Promise(function (resolve, reject) {
    //current page ke liye wait krega, algorithm milega click krega
    let waitForModalPromise = cpage.waitForSelector(selector); // finding the selector
    waitForModalPromise
      .then(function () {
        let clickModal = cpage.click(selector, { delay: 10 });
        return clickModal;
      })
      .then(function () {
        resolve();
      })
      .catch(function () {
        reject();
      });
  });
}

function questionSolver(page, question, answer) {
  return new Promise(function (resolve, reject) {
    let questionWillbeClicked = question.click();
    questionWillbeClicked
      .then(function () {
        let waitForEditor = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        ); // just to ensure we are on right page
        return waitForEditor;
      })
      .then(function () {
        return waitAndClick(".checkbox-input", page); // clicking the (test against custom input check) // aur ye prev page par already hai
      })
      .then(function () {
        return page.waitForSelector(".text-area.custominput "); //insuring that the cursor stays in that place
      })
      .then(function () {
        return page.type(".text-area.custominput", answer, { delay: 10 });
      })
      .then(function () {
        let ctrlishold = page.keyboard.down("Control"); // ctrl on hold
        return ctrlishold;
      })
      .then(function () {
        let aIsPressed = page.keyboard.press("A", { delay: 10 });
        return aIsPressed; //data selected
        //DATA IS NOW SELECTED FROM THAT INPUT BOX
      })
      .then(function () {
        let xIsPressed = page.keyboard.press("X"); //data selected
        return xIsPressed;
      })
      .then(function () {
        let ctrlIsreleased = page.keyboard.up("Control");
        return ctrlIsreleased;
        //we have cut the data
      })
      .then(function () {
        //getting on the editor box
        let waitForEditor = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return waitForEditor;
      })
      .then(function () {
        let ctrlishold = page.keyboard.down("Control"); // ctrl on hold
        return ctrlishold;
      })
      .then(function () {
        let aIsPressed = page.keyboard.press("A", { delay: 10 });
        return aIsPressed;
      })
      .then(function () {
        let vIsPressed = page.keyboard.press("V"); //data selected
        return vIsPressed; //pasting the data
      })
      .then(function () {
        let ctrlIsreleased = page.keyboard.up("Control");
        return ctrlIsreleased;
      })
      .then(function () {
        return page.click(".hr-monaco__run-code", { delay: 20 });
      })
      .then(function () {
        resolve();
      })
      .catch(function () {
        console.log(err);
      });
  });
}
