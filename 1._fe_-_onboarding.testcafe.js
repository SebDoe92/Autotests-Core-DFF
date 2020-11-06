import { Selector } from 'testcafe';

fixture `1. FE - Onboarding`
    .page `https://cnx-common-root-microfrontend.stage.cnxx.io/login`;

test('1.1. Register New Carrier + Doc Validation', async t => {
    // Step 1: Carrier Account is created via FE
    // make sure new (unique) #email (11) adress is required, before each test run to register new account
    // comment: recent adjustments in the registration test process were necessary due to several Button-Selector redefinitions (02.11.2020)
    // E.G before: #single-spa-application\:\@cnx\/dff [data-icon="tick"]; after: #single-spa-application\:\@cnx\/auth [data-icon="tick"];

    await t
        .click(Selector('#LoginFormWrapper span').withText('Jetzt registrieren'))
        .click(Selector('#background').nth(1))
        .click(Selector('#single-spa-application\\:\\@cnx\\/auth .Button__ButtonText-sc-2fxer5-1.kWGDgR').withText('Weiter'))
        .maximizeWindow()
        .typeText(Selector('#companyName').nth(1), 'AutoTest_Carrier')
        .click('#single-spa-application\:\@cnx\/auth [data-icon="tick"]')
        .typeText(Selector('#firstName').nth(1), 'Carrier')
        .typeText(Selector('#lastName').nth(1), 'Autotest')
        .typeText('#single-spa-application\:\@cnx\/auth .form-control', '123456789')
        .typeText(Selector('#email').nth(1), 'stagetest.cargonexx+465@gmail.com')
        .typeText(Selector('#password').nth(1), 'test09')
        .click(Selector('#single-spa-application\\:\\@cnx\\/auth [data-icon="tick"]').nth(2))
        .click('#single-spa-application\:\@cnx\/auth .Button__ButtonText-sc-2fxer5-1.kWGDgR')
        .click(Selector('#button-accept-compliance').nth(1))
        .maximizeWindow();

    //After account was created, registration is completed by adding necessary company data and uploading required documents.;

    await t
        .click('#single-spa-application\:\@cnx\/dff .Button__ButtonWrapper-sc-2fxer5-0.coqbDT')
        .click(Selector('.StyledSelect-sc-1cbdm8d-1.ZqBqt').nth(1))
        .click(Selector('.StyledSelect-sc-1cbdm8d-1.ZqBqt').nth(1).find('option').withText('Deutschland'))
        .typeText(Selector('#street1').nth(1), 'Neue Straße')
        .typeText(Selector('#zip').nth(1), '20095')
        .typeText(Selector('#city').nth(1), 'Hamburg')
        .typeText(Selector('#taxId').nth(1), 'DE304420013')
        .click(Selector('#euLicense').nth(1).find('.bold'))
        .setFilesToUpload('.DropzoneContainer input', ['_uploads_\\Demo Document 1.pdf'])
        .click(Selector('#insurancePolicy').nth(1).find('.bold'))
        .setFilesToUpload(Selector('.DropzoneContainer').nth(1).find('input'), ['_uploads_\\Demo Document 2.pdf'])
        .click(Selector('.Button__ButtonText-sc-2fxer5-1.kWGDgR.ButtonText').nth(2));

    //Step 2: After uploading the company documents via FE, Review and Validation are exectued via SP;

    await t
        .navigateTo('https://cnx-service-portal.stage.cnxx.io/login')
        .typeText('main .form-control', 'sd@cargonexx.de_', {
            caretPos: 0
        })
        .pressKey('tab')
        .typeText(Selector('main .form-control').nth(1), 'Sebastian1234!', {
            caretPos: 0
        })
        .click(Selector('main button').withText('Login'))
        .click(Selector('main .rt-td').nth(2))
        .click('#companyTabs-tab-DOCUMENTS')
        .click('#docMetaDataTabs-pane-1 .btn.btn-default')
        .click(Selector('#formundefined').nth(18))
        .click(Selector('#formundefined').nth(18).find('option').withText('Bestätigt'))
        .typeText(Selector('.form-control').nth(37), '01.10.2020', {
            replace: true,
            caretPos: 0
        })
        .typeText(Selector('.form-control').nth(38), '01.01.2023', {
            replace: true,
            caretPos: 0
        })
        .typeText(Selector('#formundefined').nth(19), '10000')
        .click('.btn.btn-success')
        .click('#docMetaDataTabs-tab-2')
        .click('#docMetaDataTabs-pane-2 .btn.btn-default')
        .click(Selector('#formundefined').nth(18))
        .click(Selector('#formundefined').nth(18).find('option').withText('Bestätigt'))
        .typeText(Selector('.form-control').nth(37), '01.10.2020 00:00', {
            replace: true,
            caretPos: 0
        })
        .typeText(Selector('.form-control').nth(38), '01.01.2023 00:00', {
            replace: true,
            caretPos: 0
        })
        .click(Selector('.modal-body').nth(1))
        .click('.btn.btn-success')
        .click('#companyTabs-tab-DETAILS')
        .click('#companyTabs-pane-DETAILS .btn.btn-default')
        .click(Selector('.close span').withText('×'))
        .click(Selector('#root .btn.btn-default').nth(5));
});

test('1.2. Register New Shipper', async t => {
    // make sure new (unique) #email (12) adress is required, before each test run to register new account;

    await t
        .click(Selector('#LoginFormWrapper span').withText('Jetzt registrieren'));

    // At this point, when selecting to register either Shipper or Carrier Company, both available check box options are described by rather different selector definitions 
    // carrier = definied by index selector (#backround > nth(1)); shipper selector = #single-spa-application\:\@cnx\/auth .cls-4;

    await t
        .click('#single-spa-application\:\@cnx\/auth .cls-4')
        .click(Selector('#single-spa-application\\:\\@cnx\\/auth .Button__ButtonText-sc-2fxer5-1.kWGDgR').withText('Weiter'))
        .maximizeWindow()
        .typeText(Selector('#companyName').nth(1), 'AutoTest Shipper')
        .click('#single-spa-application\:\@cnx\/auth [data-icon="tick"]')
        .typeText(Selector('#firstName').nth(1), 'Shipper')
        .typeText(Selector('#lastName').nth(1), 'Autotest')
        .typeText('#single-spa-application\:\@cnx\/auth .form-control', '123456789')
        .typeText(Selector('#email').nth(1), 'stagetest.cargonexx+464@gmail.com')
        .typeText(Selector('#password').nth(1), 'test09')
        .click(Selector('#single-spa-application\\:\\@cnx\\/auth [data-icon="tick"]').nth(2))
        .click('#single-spa-application\:\@cnx\/auth .Button__ButtonText-sc-2fxer5-1.kWGDgR');

    //After the account was created, with the following step the registration is completed by adding necessary company data.;

    await t
        .click('#single-spa-application\:\@cnx\/dff .Button__ButtonWrapper-sc-2fxer5-0.coqbDT')
        .click(Selector('.StyledSelect-sc-1cbdm8d-1.ZqBqt').nth(2))
        .click(Selector('.StyledSelect-sc-1cbdm8d-1.ZqBqt').nth(2).find('option').withText('Deutschland'))
        .typeText(Selector('#street1').nth(1), 'Neue Straße')
        .typeText(Selector('#zip').nth(1), '20095')
        .typeText(Selector('#city').nth(1), 'Hamburg')
        .typeText(Selector('#taxId').nth(1), 'DE304420013')
        .click('.Button__ButtonText-sc-2fxer5-1.kWGDgR.ButtonText');

    // After executing this autotest the optin via invitation mail has to be performed. 
    // This step cannot be automized so far due to unique invitation mail links.  
    // Afterwards you can continue with 2.1. Shipper - Create & Approve Shipment and create shipments for the company account created above (max. two shipments without validation);
});