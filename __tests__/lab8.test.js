describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });


  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('journal-entry');
    const url = await page.url();  
    expect(url).toBe('http://127.0.0.1:5500/#entry1');
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    const headerText = await page.evaluate(el => el.innerHTML, await page.$('h1'));
    expect(headerText).toBe('Entry 1');

  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    
     //implement test5: Clicking on the first journal entry should contain the following contents: 
       const expectedEntry = { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        };

        const entryPage = await page.$('entry-page');
        const entry = await entryPage.getProperty('entry');
        const data = await entry.jsonValue();
        console.log(data);

        expect(data).toEqual(expectedEntry);

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const body = await page.evaluate(el => el.className, await page.$('body'));

    expect(body).toBe('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings” 
    await page.click('header > img'); 
    const url = await page.url();  
    expect(url).toBe('http://127.0.0.1:5500/#settings');

  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const headerText = await page.evaluate(el => el.innerHTML, await page.$('h1'));
    expect(headerText).toBe('Settings');

  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const body = await page.evaluate(el => el.className, await page.$('body'));

    expect(body).toBe('settings');

  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    const url = await page.url();  
    expect(url).toBe('http://127.0.0.1:5500/#entry1');
    
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button, new URL should be ', async() => {
    // implement test11: Clicking on the back button should update the URL to contain ‘’
    await page.goBack();
    const url = await page.url();  
    expect(url).toBe('http://127.0.0.1:5500/');
    
  });


  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: On home page - checking page header title', async () => {
    // implement test12: Clicking on the home icon should update the header to be “Journal Entries”
    const headerText = await page.evaluate(el => el.innerHTML, await page.$('h1'));
    expect(headerText).toBe('Journal Entries');
  });


  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On home page - checking <body> element classes', async () => {
    // implement test13: Clicking on the h icon should update the class attribute of <body> to ‘settings’
    const body = await page.evaluate(el => el.className, await page.$('body'));
    console.log(body);

    expect(body).toBe('');

  });


  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Clicking second <journal-entry>, new URL should contain /#entry2', async () => {
    // implement test14: Clicking on the first journal entry should update the URL to contain “/#entry1”
    //const entries = await page.$$('journal-entry');
    //await entries[1].click();
    await page.click('journal-entry:nth-child(2)')
    const url = await page.url();  
    expect(await page.url()).toBe('http://127.0.0.1:5500/#entry2');
  });


  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: On home page - checking page header title', async () => {
    // implement test15: Clicking on the home icon should update the header to be “Journal Entries”
    const headerText = await page.evaluate(el => el.innerHTML, await page.$('h1'));
    expect(headerText).toBe('Entry 2');
  });


  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: On second Entry page - checking <entry-page> contents', async () => {
    
    //implement test5: Clicking on the first journal entry should contain the following contents: 
      const expectedEntry = {
        date: "4/26/2021",
        title: "Run, Forrest! Run!",
        content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
        image: {
          src: "https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg",
          alt: "forrest running"
        }
      };

       const entryPage = await page.$('entry-page');
       const entry = await entryPage.getProperty('entry');
       const data = await entry.jsonValue();
       console.log(data.audio);

       expect(data).toEqual(expectedEntry);

 }, 10000);


  // create your own test 17
  it('Test17: Clicking the back button, new URL should be ', async() => {
    // implement test17: Clicking on the back button should update the URL to contain ‘’
    await page.goBack();
    const url = await page.url();  
    expect(url).toBe('http://127.0.0.1:5500/');
    
  });

  // create your own test 18
  it('Test18: Clicking third <journal-entry>, new URL should contain /#entry3', async () => {
    // implement 18: Clicking on the first journal entry should update the URL to contain “/#entry1”
    const entries = await page.$$('journal-entry');
    await entries[2].click();
    //const url = await page.url();  
    expect(await page.url()).toBe('http://127.0.0.1:5500/#entry3');
  });


  // create your own test 19
  it('Test19: On third entry page - checking page header title', async () => {
    // implement test19: Clicking on the third entry should update the header to be "Entry 3"
    const headerText = await page.evaluate(el => el.innerHTML, await page.$('h1'));
    expect(headerText).toBe('Entry 3');
  });

  // create your own test 20
  it('Test20: On third Entry page - checking <entry-page> contents', async () => {
    
    //implement test20: Clicking on the third journal entry should contain the following contents: 
      const expectedEntry = {
        date: "4/27/2021",
        title: "Ogres are like onions",
        content: "Onions have layers. Ogres have layers. Onions have layers. You get it? We both have layers.",
        image: {
          src: "https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.syracuse.com/home/syr-media/width2048/img/entertainment_impact/photo/shrek-donkeyjpg-daa31aa2b5bedfaa.jpg",
          alt: "shrek and donkey looking confused"
        }
      };

       const entryPage = await page.$('entry-page');
       const entry = await entryPage.getProperty('entry');
       const data = await entry.jsonValue();
       console.log(data.audio);

       expect(data).toEqual(expectedEntry);

 }, 10000);
  
});
