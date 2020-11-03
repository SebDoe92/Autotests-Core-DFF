import { Selector } from 'testcafe';

fixture `3. FE - Shipping`
    .page `https://cnx-common-root-microfrontend.stage.cnxx.io/login`;

test('3.1. Shipper - Create & Approve Shipment', async t => {
    await t
        .typeText(Selector('#input-username').nth(1), 'stagetest.cargonexx+27@gmail.com')
        .typeText(Selector('#input-password').nth(1), 'karhan09')
        .click(Selector('#LoginFormWrapper span').withText('Login'))
        .click('#single-spa-application\:\@cnx\/dff .bp3-input')
        .typeText('#single-spa-application\:\@cnx\/dff .bp3-input', '48143')
        .click(Selector('#single-spa-application\\:\\@cnx\\/dff span').withText(' Münster - Centrum').nth(3))
        .typeText(Selector('#single-spa-application\\:\\@cnx\\/dff .bp3-input').nth(1), '75015')
        .click(Selector('#single-spa-application\\:\\@cnx\\/dff span').withText(' Bretten - Bauerbach').nth(3))
        .maximizeWindow()
        .click('#single-spa-application\:\@cnx\/dff .Button__ButtonText-sc-2fxer5-1.kWGDgR')
        .click(Selector('#single-spa-application\\:\\@cnx\\/dff .Button__ButtonText-sc-2fxer5-1.kWGDgR').nth(1))
        .typeText(Selector('#tour\\.stops\\[0\\]\\.contact\\.companyName').nth(1), 'ABC Firma')
        .typeText(Selector('#tour\\.stops\\[0\\]\\.address\\.street1').nth(1), 'Neue Straße 7')
        .typeText(Selector('#tour\\.stops\\[0\\]\\.reference').nth(1), '123ABC')
        .typeText(Selector('#tour\\.stops\\[1\\]\\.contact\\.companyName').nth(1), 'XYZ Firma')
        .typeText(Selector('#tour\\.stops\\[1\\]\\.address\\.street1').nth(1), 'Alte Straße 5')
        .typeText(Selector('#tour\\.stops\\[1\\]\\.reference').nth(1), 'XYZ789')
        .click('.Button__ButtonText-sc-2fxer5-1.kWGDgR.ButtonText')
        .navigateTo('https://cnx-service-portal.stage.cnxx.io/login')
        .typeText('main .form-control', 'sd@cargonexx.de_', {
            caretPos: 0
        })
        .pressKey('tab')
        .typeText(Selector('main .form-control').nth(1), 'Sebastian1234!', {
            caretPos: 0
        })
        .click(Selector('main button').withText('Login'))
        .click('#shipments-dropdown')
        .click(Selector('#root a').withText('Services'))
        .click(Selector('main div').withText('KW27 Shipper').nth(9))
        .click('#shipmentTabs-pane-1 .btn-xs.btn.btn-success')
        .click('#shipmentTabs-pane-1 .btn-xs.btn.btn-success');
});

test('3.2. Carrier - Accept Shipment', async t => {
    await t
        .typeText(Selector('#input-username').nth(1), 'stagetest.cargonexx+442@gmail.com')
        .typeText(Selector('#input-password').nth(1), 'test09')
        .click('#LoginFormWrapper .Button__ButtonIcon-sc-2fxer5-2.dylPDC.ButtonIcon')
        .maximizeWindow()
        .click(Selector('#single-spa-application\\:\\@cnx\\/dff .rt-resizable-header-content').nth(2))
        .typeText(Selector('#single-spa-application\\:\\@cnx\\/dff div').nth(8).find('div').nth(2).find('div div').nth(20).find('div div div').nth(29).find('div div').nth(4).find('input'), '48143')
        .click(Selector('#single-spa-application\\:\\@cnx\\/dff span').withText('Show details'))
        .click('.Button__ButtonText-sc-2fxer5-1.kWGDgR.ButtonText')
        .click('.bp3-icon.bp3-icon-tick [data-icon="tick"]')
        .click('.Button__ButtonText-sc-2fxer5-1.kWGDgR.ButtonText')
        .click('#single-spa-application\:\@cnx\/dff .App__RoutesWrapper-yfv613-1.jrXrrT');
});

test('3.3. Carrier - Monitor Shipment', async t => {
    await t
        .typeText(Selector('#input-username').nth(1), 'stagetest.cargonexx+442@gmail.com')
        .typeText(Selector('#input-password').nth(1), 'test09')
        .click('#LoginFormWrapper .Button__ButtonIcon-sc-2fxer5-2.dylPDC.ButtonIcon')
        .click(Selector('header span').withText('Meine Aufträge'))
        .click('#single-spa-application\:\@cnx\/dff .rt-resizable-header-content')
        .click('#single-spa-application\:\@cnx\/dff .rt-resizable-header-content')
        .click(Selector('#single-spa-application\\:\\@cnx\\/dff .rt-td').nth(2))
        .click('#shipment-booked-modal-tab-1')
        .typeText(Selector('#vehicle\\.truckLicence').nth(1), 'HH-TI-1234')
        .typeText(Selector('#vehicle\\.trailerLicence').nth(1), 'HH-UI-5678')
        .typeText(Selector('#vehicle\\.driverName').nth(1), 'Manni Truck')
        .typeText('#shipment-booked-modal-pane-1 .form-control', '123456789')
        .click('#shipment-booked-modal-pane-1 .Button__ButtonText-sc-2fxer5-1.kWGDgR.ButtonText')
        .click(Selector('#shipment-booked-modal-pane-1 span').withText('Speichern').nth(1))
        .click('#shipment-booked-modal-pane-1 .Select-arrow-zone')
        .click('#react-select-4--option-34')
        .click('#shipment-booked-modal-pane-1 .Button__ButtonText-sc-2fxer5-1.kWGDgR.ButtonText')
        .click('#shipment-booked-modal-pane-1 .Button__ButtonText-sc-2fxer5-1.kWGDgR.ButtonText')
        .click('#shipment-booked-modal-pane-1 .StyledSelect-sc-1cbdm8d-1.hjtUyX')
        .click(Selector('#shipment-booked-modal-pane-1 option').withText('Reine Quittung - ohne Beanstandung geladen'))
        .click(Selector('#shipment-booked-modal-pane-1 span').withText('Beladung melden').nth(1))
        .click('#shipment-booked-modal-pane-1 .Button__ButtonText-sc-2fxer5-1.kWGDgR.ButtonText')
        .click('#react-select-8--value .Select-value')
        .click('#react-select-8--option-32')
        .click(Selector('#shipment-booked-modal-pane-1 span').withText('ETA bestätigen').nth(1))
        .click('#shipment-booked-modal-pane-1 .Button__ButtonText-sc-2fxer5-1.kWGDgR.ButtonText')
        .click('#shipment-booked-modal-pane-1 .StyledSelect-sc-1cbdm8d-1.hjtUyX')
        .click(Selector('#shipment-booked-modal-pane-1 option').withText('Reine Quittung - ohne Beanstandung entladen'));

    //Hier einen test text verfassen;

    await t
        .click(Selector('#shipment-booked-modal-pane-1 span').withText('Entladung melden').nth(1))
        .click(Selector('.close span').withText('×'));
});