import { Selector } from 'testcafe';

fixture `3. SP - Onboarding`
    .page `https://cnx-service-portal.stage.cnxx.io/login`
    .beforeEach(async t => {
        //this login action is executed before each individual test within this test fixture;

        await t
            .typeText('main .form-control', 'sd@cargonexx.de_', {
                caretPos: 0
            })
            .pressKey('tab')
            .typeText(Selector('main .form-control').nth(1), 'Sebastian1234!', {
                caretPos: 0
            })
            .click(Selector('main button').withText('Login'));
    });

test('3.1. Create Shipper Company & Account - SP', async t => {
    // Step 1: Create Shipper Company
    // make sure new (unique) #E-Mail (17) adress is required, before each test run to register new account;

    await t
        .click(Selector('main button').withText('Create Company'))
        .typeText('#formName\*', 'AutoTest Shipper')
        .typeText('#formPLZ\*', '20095')
        .pressKey('tab')
        .typeText('#formStadt\*', 'Hamburg')
        .typeText('#formUstId\*', 'DE304420013')
        .click(Selector('label').withText('Ist Verlader'))
        .click(Selector('button').withText('Speichern'))
        .click(Selector('main button').withText('Reload Companies'))
        .click(Selector('main div').withText('AutoTest Shipper').nth(8));

    // Step 2: Account is added to Shipper Company;

    await t
        .click('#companyTabs-tab-ACCOUNTS')
        .click(Selector('#companyTabs-pane-ACCOUNTS button').withText('Account erstellen'))
        .typeText('#formVorname', 'Shipper')
        .typeText('#formNachname', 'Autotest')
        .typeText('#formE-Mail', 'stagetest.cargonexx+466@gmail.com')
        .pressKey('tab')
        .typeText('#formPasswort', 'test09')
        .typeText('#formTelefon', '123456789')
        .click('.btn.btn-success');

    // Step 3: Following Invoicemail & Invoice Settings are edited to provide standardized setup for Invoicing Autotest;

    await t
        .maximizeWindow()
        .click('#companyTabs-tab-DETAILS')
        .click('#companyTabs-pane-DETAILS .btn.btn-warning')
        .typeText('#formRechnungsemail', 'stagetest.cargonexx+111@gmail.com')
        .click('#formRechnungstyp')
        .click(Selector('#formRechnungstyp option').withText('Invoice'))
        .click('#formFrachtpapier\ Typ')
        .click(Selector('#formFrachtpapier\\ Typ option').withText('Digital'))
        .click('#companyTabs-pane-DETAILS .btn.btn-success')
        .click(Selector('.close span').withText('×'));
});

test('3.2. Create Carrier + Doc Upload & Validation', async t => {
    // Step 1: Carrier Company is created
    // make sure new (unique) #E-Mail (17) adress is required, before each test run to register new account;

    await t
        .maximizeWindow()
        .click(Selector('main .btn.btn-info').nth(3))
        .typeText('#formName\*', 'AutoTest_Carrier')
        .typeText('#formStraße\,\ Hausnummer', 'Neue Straße')
        .typeText('#formPLZ\*', '20095')
        .typeText('#formStadt\*', 'Hamburg')
        .typeText('#formUstId\*', 'DE304420013')
        .click(Selector('.checkbox').nth(1).find('[name="makeCarrierCompany"]'))
        .click('.btn.btn-success');

    // Step 2: Carrier Account is added to company;

    await t
        .click(Selector('main .btn.btn-info').nth(1))
        .click(Selector('main .rt-td').nth(2))
        .click('#companyTabs-tab-ACCOUNTS')
        .click('#companyTabs-pane-ACCOUNTS .btn-xs.btn.btn-default')
        .typeText('#formVorname', 'Carrier')
        .typeText('#formNachname', 'Autotest')
        .typeText('#formE-Mail', 'stagetest.cargonex+467@gmail.com')
        .typeText('#formPasswort', 'test09')
        .typeText('#formTelefon', '123456789')
        .click('.btn.btn-success');

    // Step 3: Company Documents are uploaded & validated;

    await t
        .click('#companyTabs-tab-DOCUMENTS')
        .click(Selector('#companyTabs-pane-DOCUMENTS .btn.btn-default').nth(1))
        .click(Selector('.radio label').withText('Insurance Policy'))
        .click(Selector('#formundefined').nth(18))
        .click(Selector('#formundefined').nth(18).find('option').withText('Bestätigt'))
        .typeText(Selector('.form-control').nth(37), '01.01.2020 00:00')
        .pressKey('tab')
        .typeText(Selector('.form-control').nth(38), '01.01.2023 00:00')
        .pressKey('tab')
        .typeText(Selector('#formundefined').nth(19), '10000')
        .click(Selector('.DropzoneContainer p').withText('Drop file or click'))
        .setFilesToUpload('.DropzoneContainer input', ['_uploads_\\Demo Document 6.pdf'])
        .click('.btn.btn-success')
        .click(Selector('#companyTabs-pane-DOCUMENTS .btn.btn-default').nth(1))
        .click(Selector('.radio').nth(1).find('label input'))
        .click(Selector('#formundefined').nth(18))
        .click(Selector('#formundefined').nth(18).find('option').withText('Bestätigt'))
        .typeText(Selector('.form-control').nth(37), '01.01.2020 00:00')
        .typeText(Selector('.form-control').nth(38), '01.01.2023 00:00')
        .click(Selector('.DropzoneContainer p').withText('Drop file or click'))
        .setFilesToUpload('.DropzoneContainer input', ['_uploads_\\Demo Document 7.pdf'])
        .click('.btn.btn-success');

    // Step 4: edited Carrier Invoice Settings to provide standardized setup for Invoicing Autotest;

    await t
        .click('#companyTabs-tab-DETAILS')
        .click('#companyTabs-pane-DETAILS .btn.btn-default')
        .click('#companyTabs-pane-DETAILS .btn.btn-warning')
        .typeText('#formRechnungsemail', 'test.cargonexx+222@gmail.com')
        .click('#formRechnungstyp')
        .click(Selector('#formRechnungstyp option').withText('Credit note'))
        .click('#formFrachtpapier\ Typ')
        .click(Selector('#formFrachtpapier\\ Typ option').withText('Original'))
        .click('#companyTabs-pane-DETAILS .btn.btn-success')
        .click(Selector('.close span').withText('×'));
});

test('3.3. Optin (inapplicable) ', async t => {
    // Optin-Test cannot be performed automatically so far 
    // Reason: confirm mail with unique UserID/Optin Token in URL is required for each new Account;

    await t
        .navigateTo('https://cnx-common-root-microfrontend.stage.cnxx.io/registerInvite?userId=26543&token=0fe6fd43-36fe-4b19-9459-89f668419a8a')
        .click('#single-spa-application\:\@cnx\/dff [data-icon="tick"]')
        .typeText(Selector('#firstName').nth(1), 'User')
        .pressKey('tab')
        .typeText(Selector('#lastName').nth(1), 'AutoTest')
        .typeText('#single-spa-application\:\@cnx\/dff .form-control', '123456789')
        .typeText(Selector('#password').nth(1), 'test09')
        .click(Selector('#single-spa-application\\:\\@cnx\\/dff [data-icon="tick"]').nth(2))
        .maximizeWindow()
        .click(Selector('#single-spa-application\\:\\@cnx\\/dff span').withText('Registrierung absenden'));
});