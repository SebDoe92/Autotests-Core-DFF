import { Selector } from 'testcafe';

fixture `5. SP - Shipping`
    .page `https://cnx-service-portal.stage.cnxx.io/login`
    .beforeEach(async t => {
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

test('5.1. Book Standard Shipment - No Pallet Exchange', async t => {
    await t
        .click(Selector('#root button').withText('Accounts'))
        .click(Selector('main div').withText('AutoTest Shipper').nth(8))
        .click(Selector('#accountTabs-pane-1 button').withText('Create Shipment for User'))
        .click(Selector('#shipmentTabs-pane-1 button').withText('Bearbeiten').nth(1))
        .maximizeWindow()
        .typeText(Selector('#stop-list-pane-1 div div div div div div').nth(2).find('div span span div input'), '28195')
        .click(Selector('#stop-list-pane-1 span').withText('Bremen').nth(2))
        .click('#stop-list-tab-2')
        .typeText(Selector('#stop-list-pane-2 div div div div div div').nth(2).find('div span span div input'), '50667')
        .click(Selector('#stop-list-pane-2 span').withText('Köln ').nth(2))
        .click(Selector('#stop-list-pane-2 label').withText('Pallet Exchange'))
        .click(Selector('#shipmentTabs-pane-1 button').withText('Speichern').nth(1))
        .click(Selector('#shipmentTabs-pane-1 button').withText('Buchen'));

    // Dependent on existing FreeTrucks, TourRadars etc., during approval action the shipment could be set to the status "Held for CH" or/and "Held for Platform".
    // According to that the shipment has to be approved ("Freigeben") one or two (two or three times) to be set on shipment status = "Approved"
    // The autotest setup considers two (<s>three</s>) "Freigeben"-Actions. This way the shipment will end up in the correct status for both cases. 
    // However in case the shipment is not set on "Held for CH", autotest might stop at this point, due to one redundant Approval Action. 
    // Anyway shipment will have the correct status for further tests.
    // Update:no additional approval for "Held for Platform" - Status required anymore --> from now on only two Approve Shipment actions considered;

    await t
        .click(Selector('#shipmentTabs-pane-1 button').withText('Freigeben'))
        .click(Selector('#shipmentTabs-pane-1 button').withText('Freigeben'))
        .click(Selector('span').withText('×').nth(1))
        .click(Selector('span').withText('×'));
});

test('5.2. Assign Carrier to Standard Shipment ', async t => {
    // Because Shipment Table Filter cannot be used in autotest as of yet, filtering for shipments in Status = 'offen' is not possible.
    // Therefore make sure that E.G. a 'Standard Shipment' autotest is always executed and a shipment is available, before running this specific test.;

    await t
        .click('#shipments-dropdown')
        .click(Selector('#root a').withText('Services'))
        .maximizeWindow()
        .wait(5000)
        .click(Selector('main .rt-td').nth(3))
        .click(Selector('#shipmentTabs-pane-1 .pull-right.btn-xs.btn.btn-default').nth(6))
        .click('#clearFilter')
        .typeText(Selector('.rt-th').nth(50).find('input'), 'AutoTest_Carrier')
        .click(Selector('.rt-td').nth(2002))
        .click(Selector('.btn.btn-success').nth(8))
        .click('#shipmentTabs-tab-2')
        .click('#shipmentTabs-pane-2 .btn-xs.btn.btn-default')
        .typeText('#formZugmaschine\ \(Pflichtfeld\)', 'HH-WE-1234')
        .typeText('#formAuflieger', 'HH-UW-5678')
        .typeText('#formName\ Fahrer', 'Lutz Last')
        .typeText('#formTelefon\ Fahrer', '0123456789')
        .click('#shipmentTabs-pane-2 .btn-xs.btn.btn-success');
});

test('5.3. Book Shipment with Pallet Exchange & extra costs ', async t => {
    await t
        .click(Selector('#root button').withText('Accounts'))
        .click(Selector('main div').withText('AutoTest Shipper').nth(8))
        .click(Selector('#accountTabs-pane-1 button').withText('Create Shipment for User'))
        .click(Selector('#shipmentTabs-pane-1 button').withText('Bearbeiten').nth(1))
        .maximizeWindow()
        .typeText(Selector('#stop-list-pane-1 div div div div div div').nth(2).find('div span span div input'), '28195')
        .click(Selector('#stop-list-pane-1 span').withText('Bremen').nth(2))
        .click('#stop-list-tab-2')
        .typeText(Selector('#stop-list-pane-2 div div div div div div').nth(2).find('div span span div input'), '50667')
        .click(Selector('#stop-list-pane-2 span').withText('Köln ').nth(2))
        .click('#stop-list-pane-2 [name^="tour.cargos[0].palletExchangeRequirements.typeChec"]')
        .click(Selector('#stop-list-pane-2 [name^="tour.cargos[0].palletExchangeRequirements.typeChec"]').nth(1))
        .click(Selector('#stop-list-pane-2 [name^="tour.cargos[0].palletExchangeRequirements.external"]').nth(1))
        .click(Selector('#shipmentTabs-pane-1 div').withText('AbbrechenSpeichern').nth(3))
        .click(Selector('#shipmentTabs-pane-1 button').withText('Speichern').nth(1))
        .click(Selector('#shipmentTabs-pane-1 button').withText('Buchen'));

    // Dependent on existing FreeTrucks, TourRadars etc., during approval action the shipment could be set to the status "Held for CH".
    // According to that the shipment has to be approved ("Freigeben") one or two times to be set on shipment status = "Approved"
    // The autotest setup considers two "Freigeben"-Actions. This way the shipment will end up in the correct status for both cases. 
    // However in case the shipment is not set on "Held for CH", autotest might stop at this point, due to one redundant Approval Action. 
    // Anyway shipment will have the correct status for further tests.;

    await t
        .click(Selector('#shipmentTabs-pane-1 button').withText('Freigeben'))
        .click(Selector('#shipmentTabs-pane-1 button').withText('Freigeben'))
        .click(Selector('#shipmentTabs-pane-1 button').withText('change').nth(3))
        .click('#form')
        .click(Selector('#form option').withText('Andere Kosten'))
        .typeText(Selector('#formundefined').nth(2), '100')
        .click(Selector('button').withText('Speichern').nth(1))
        .click(Selector('#shipmentTabs-pane-1 button').withText('change').nth(1))
        .click('#form')
        .click(Selector('#form option').withText('Andere Kosten'))
        .typeText(Selector('#formundefined').nth(2), '80')
        .click(Selector('button').withText('Speichern').nth(1))
        .click(Selector('span').withText('×').nth(1))
        .click(Selector('span').withText('×'));
});

test('5.4. Assign Carrier to Pallet Exchange Shipment ', async t => {
    //Requires execution of autotest 5.4.Book Shipment with Pallet Exchange before to assure the existince of shipment with desired settings;

    await t
        .click('#shipments-dropdown')
        .click(Selector('#root a').withText('Services'))
        .maximizeWindow()
        .wait(5000)
        .click(Selector('main .rt-td').nth(3))
        .click(Selector('#shipmentTabs-pane-1 .pull-right.btn-xs.btn.btn-default').nth(6))
        .click('#clearFilter')
        .maximizeWindow()
        .typeText(Selector('.rt-th').nth(50).find('input'), 'AutoTest_Carrier')
        .click(Selector('.rt-td').nth(2002))
        .click(Selector('.radio').nth(4).find('[name="suficientPallets"]'))
        .click(Selector('.radio').nth(6).find('[name="externalPalletManagement"]'))
        .click(Selector('.btn.btn-success').nth(8));
});

test('5.5. Monitoring Standard Shipment', async t => {
    //to assure that a shipment of the required status "assigned" is available, execute Book Shipment & Assign Carrier Autotest before 
    //applicable for both 5.1.+ 5.2. --> Standard Shipment or 5.3. + 5.4. Pallet Exchange Shipment;

    await t
        .maximizeWindow()
        .click('#shipments-dropdown')
        .click(Selector('#root a').withText('Services'))
        .wait(5000)
        .click(Selector('main .rt-td').withText('AutoTest Shipper'));

    //added the text specification for the autotest shipper user, to make sure the selected shipment is assigned to autotest shipper user and therefore in the required status#shipmentTabs-pane-1 .btn.btn-success;

    await t
        .click('#shipmentTabs-pane-1 .btn.btn-warning')
        .click(Selector('#stop-list-pane-1 .form-control').nth(8))
        .click(Selector('#stop-list-pane-1 .rdtDay').nth(108))
        .click(Selector('#shipmentTabs-pane-1 .btn.btn-success').nth(-1));

    // #shipmentTabs-pane-1 .btn.btn-success = "Speichern" --> index number of the button changed from nth(9) to nth(8) for unknown reason
    // consequently the index selector has been changed from initial nth(9) to nth(-1) 
    // nth(-1) implies that the index is counted from the end of the matched set
    // hopefully this solution ensures correct selection also in case of future adjustments  
    // same adjustment was exectued for all following "Speichern"-Button actions;

    await t
        .click('#shipmentTabs-pane-1 .btn.btn-warning')
        .click(Selector('#stop-list-pane-1 .form-control').nth(9))
        .click(Selector('#stop-list-pane-1 .rdtDay').nth(150))
        .click(Selector('#shipmentTabs-pane-1 .btn.btn-success').nth(-1))
        .click('#stop-list-pane-1 .btn.btn-success')
        .click(Selector('.btn.btn-success').nth(-1))
        .click(Selector('#stop-list-pane-1 .btn.btn-success').nth(1))
        .click('#formStatus')
        .click(Selector('#formStatus option').withText('CLEAN_CHANGED_NUMBER_OF_PIECES'))
        .click(Selector('.btn.btn-success').nth(-1))
        .click('#stop-list-tab-2')
        .click('#shipmentTabs-pane-1 .btn.btn-warning')
        .click(Selector('#stop-list-pane-2 .form-control').nth(13))
        .click(Selector('#stop-list-pane-2 .rdtDay').nth(108))
        .click(Selector('#shipmentTabs-pane-1 .btn.btn-success').nth(-1))
        .click('#shipmentTabs-pane-1 .btn.btn-warning')
        .click(Selector('#stop-list-pane-2 .form-control').nth(14))
        .click(Selector('#stop-list-pane-2 .rdtDay').nth(150))
        .click(Selector('#shipmentTabs-pane-1 .btn.btn-success').nth(-1))
        .click('#stop-list-pane-2 .btn.btn-success')
        .click('#formAblauf\ Status')
        .click(Selector('#formAblauf\\ Status option').withText('TIMESLOT_MISSED'))
        .click(Selector('.btn.btn-success').nth(-1))
        .click(Selector('#stop-list-pane-2 .btn.btn-success').nth(1))
        .click(Selector('.btn.btn-success').nth(-1))
        .click(Selector('.close span').withText('×'));
});

test('5.6. Book Shipment with Additional Stop', async t => {
    await t
        .click(Selector('#root button').withText('Accounts'))
        .click(Selector('main div').withText('AutoTest Shipper').nth(8))
        .click(Selector('#accountTabs-pane-1 button').withText('Create Shipment for User'))
        .click(Selector('#shipmentTabs-pane-1 button').withText('Bearbeiten').nth(1))
        .maximizeWindow()
        .click('#stop-list-tab-4')
        .click(Selector('#stop-list-pane-4 button').withText('Stop hinzufügen'))
        .click(Selector('button').withText('Speichern').nth(2))
        .click('#stop-list-tab-1')
        .typeText(Selector('#stop-list-pane-1 div div div div div div').nth(2).find('div span span div input'), '28195')
        .click(Selector('#stop-list-pane-1 span').withText('Bremen').nth(2))
        .click('#stop-list-tab-2')
        .typeText(Selector('#stop-list-pane-2 div div div div div div').nth(2).find('div span span div input'), '50667')
        .click(Selector('#stop-list-pane-2 span').withText('Köln ').nth(2))
        .typeText('#formWeight', '2400', {
            replace: true,
            caretPos: 0
        })
        .typeText('#formLdm', '5', {
            replace: true,
            caretPos: 0
        })
        .typeText('#formCount', '20', {
            replace: true,
            caretPos: 0
        })
        .click('#stop-list-pane-2 [name="tour.cargos[1].palletExchange"]')
        .click('#stop-list-tab-3')
        .typeText(Selector('#stop-list-pane-3 div div div div div div').nth(2).find('div span span div input'), '74072')
        .click('#stop-list-pane-3 .highlighted')
        .typeText(Selector('#formWeight').nth(1), '1000', {
            replace: true,
            caretPos: 0
        })
        .typeText(Selector('#formLdm').nth(1), '5', {
            replace: true,
            caretPos: 0
        })
        .typeText(Selector('#formCount').nth(1), '10', {
            replace: true,
            caretPos: 0
        })
        .click(Selector('#shipmentTabs-pane-1 button').withText('Speichern').nth(1))
        .click(Selector('#shipmentTabs-pane-1 button').withText('Buchen'))
        .click(Selector('#shipmentTabs-pane-1 button').withText('Freigeben'))
        .click(Selector('#shipmentTabs-pane-1 button').withText('Freigeben'))
        .click(Selector('#shipmentTabs-pane-1 button').withText('Freigeben'))
        .click(Selector('span').withText('×').nth(1))
        .click(Selector('span').withText('×'));
});

test('5.7. Clone Shipment', async t => {
    await t
        .click('#shipments-dropdown')
        .click(Selector('#root a').withText('Services'))
        .click(Selector('main .rt-td').nth(1))
        .click('#shipmentTabs-pane-1 .btn-xs.btn.btn-success')
        .click('#root .bottom-right')
        .click('#stop-list-tab-1')
        .click('#shipmentTabs-pane-1 .btn.btn-warning')
        .click(Selector('#shipmentTabs-pane-1 .btn.btn-success').nth(9))
        .click('#shipmentTabs-pane-1 .btn-xs.btn.btn-success')
        .click('#shipmentTabs-pane-1 .btn-xs.btn.btn-success')
        .click('#shipmentTabs-pane-1 .btn-xs.btn.btn-success')
        .click('#shipmentTabs-pane-1 .btn-xs.btn.btn-success')
        .click(Selector('.close span').withText('×'));
});

test('5.8. Bundling (inapplicable)', async t => {
    await t
        .click(Selector('#root button').withText('Accounts'))
        .click(Selector('main div').withText('AutoTest Shipper').nth(8))
        .click(Selector('#accountTabs-pane-1 button').withText('Create Shipment for User'))
        .click(Selector('#shipmentTabs-pane-1 button').withText('Bearbeiten').nth(1))
        .maximizeWindow()
        .typeText(Selector('#stop-list-pane-1 div div div div div div').nth(2).find('div span span div input'), '28195')
        .click(Selector('#stop-list-pane-1 span').withText('Bremen').nth(2))
        .click('#stop-list-tab-2')
        .typeText(Selector('#stop-list-pane-2 div div div div div div').nth(2).find('div span span div input'), '50667')
        .click(Selector('#stop-list-pane-2 span').withText('Köln ').nth(2))
        .click(Selector('#stop-list-pane-2 label').withText('Pallet Exchange'))
        .click(Selector('#shipmentTabs-pane-1 button').withText('Speichern').nth(1))
        .click(Selector('#shipmentTabs-pane-1 button').withText('Buchen'))
        .click(Selector('#shipmentTabs-pane-1 button').withText('Freigeben'))
        .click(Selector('#shipmentTabs-pane-1 button').withText('Freigeben'))
        .click(Selector('span').withText('×').nth(1))
        .click(Selector('span').withText('×'))
        .click('#shipments-dropdown')
        .click(Selector('#root a').withText('Services'))
        .click(Selector('main div').withText('AutoTest Shipper').nth(9))
        .click('#shipmentTabs-pane-1 .btn-xs.btn.btn-success')
        .click('#shipmentTabs-pane-1 .btn.btn-warning')
        .selectText(Selector('#stop-list-pane-1 div div div div div div').nth(2).find('div span span div input'), 12, 0)
        .typeText(Selector('#stop-list-pane-1 div div div div div div').nth(2).find('div span span div input'), '50667', {
            caretPos: 0
        })
        .click('#stop-list-pane-1 [class^="bp3-menu-item bp3-active bp3-intent-primary bp3-po"]')
        .click(Selector('#stop-list-pane-1 .form-control').nth(1))
        .click(Selector('#stop-list-pane-1 .rdtDay').nth(33))
        .click('#stop-list-tab-2')
        .selectText(Selector('#stop-list-pane-2 div div div div div div').nth(2).find('div span span div input'), 10, 0)
        .typeText(Selector('#stop-list-pane-2 div div div div div div').nth(2).find('div span span div input'), '99084', {
            caretPos: 0
        })
        .click('#stop-list-pane-2 .bp3-text-overflow-ellipsis.bp3-fill')
        .click(Selector('#shipmentTabs-pane-1 .btn.btn-success').nth(9))
        .click('#stop-list-tab-1');
});

test('5.9. FreeTruck & TourRadar Matching', async t => {
    //Step 1: create a freetruck with certain specifications for a carrier acount via SP;

    await t
        .click(Selector('#root .btn.btn-default').nth(3))
        .click(Selector('main div').withText('AutoTest_Carrier').nth(8))
        .maximizeWindow();

    //to select freetruck modal input fields and buttons correctly, a full screen is required;

    await t
        .click('#accountTabs-tab-2')
        .click(Selector('#accountTabs-pane-2 .btn.btn-success').nth(7))
        .typeText('.bp3-popover-target div input', '88045')
        .click(Selector('[class^="PlaceSearchComponents__GreenHighlighter-xwv9va-0 f"]').nth(1).find('span').withText('Friedrichshafen - Schnetzenhausen'))
        .typeText(Selector('.bp3-popover-target').nth(1).find('div input'), '90402')
        .click('[class^="bp3-menu-item bp3-popover-dismiss PlaceSearchCompo"]')
        .click(Selector('.bp3-icon.bp3-icon-tick').nth(1).find('[data-icon="tick"]'));

    //For both FreeTruck & TourRadar settings, no date is specified so the autotest can be employed at any time;

    await t
        .click(Selector('.btn.btn-success').nth(23))
        .click(Selector('.close').nth(1).find('span').withText('×'));

    // At this step a modal with possible shipments matching the FreeTruck specification could be suggested. Therefore a 'close'- action could be required.
    // Step 1 (create FreeTruck) finished here
    // Step 2: employ TourTadar (navigate to FE);

    await t
        .navigateTo('https://cnx-common-root-microfrontend.stage.cnxx.io/login')
        .typeText(Selector('#input-username').nth(1), 'stagetest.cargonexx+442@gmail.com')
        .typeText(Selector('#input-password').nth(1), 'test09');

    //use different login data to create FreeTruck & Radar for different accounts. For reasons of simplification the same account is used here for both.;

    await t
        .click('#LoginFormWrapper .Button__ButtonText-sc-2fxer5-1.kWGDgR.ButtonText')
        .click('#single-spa-application\:\@cnx\/dff .Button__ButtonText-sc-2fxer5-1.cFSkVR.ButtonText')
        .typeText(Selector('.bp3-input').nth(1), '88045')
        .click(Selector('[class^="PlaceSearchComponents__GreenHighlighter-sc-19tqfac"]').nth(1).find('span').withText('Friedrichshafen - Schnetzenhausen'))
        .typeText(Selector('.bp3-input').nth(2), '90402')
        .click(Selector('[class^="PlaceSearchComponents__GreenHighlighter-sc-19tqfac"]').nth(1).find('span').withText('Nürnberg - Gleißbühl'))
        .click(Selector('.bp3-icon.bp3-icon-tick').nth(1).find('[data-icon="tick"]'))
        .click('.Button__ButtonText-sc-2fxer5-1.kWGDgR')
        .click(Selector('.close span').withText('×'));

    //Same as in the SP FreeTruck Modal - if matching Shipments already available, close the notification for now .;

    // TourRadar is employed - Step 2 is finished
    // Step 3: create matching shipment (navigate back to SP);

    await t
        .navigateTo('https://cnx-service-portal.stage.cnxx.io/accounts')
        .click(Selector('main div').withText('AutoTest Shipper').nth(8))
        .click('#accountTabs-pane-1 .btn.btn-success')
        .click('#shipmentTabs-pane-1 .btn.btn-warning')
        .typeText(Selector('#stop-list-pane-1 div div div div div div').nth(2).find('div span span div input'), '88045')
        .click(Selector('#stop-list-pane-1 span').withText('Friedrichshafen - Schnetzenhausen').nth(2))
        .click('#stop-list-tab-2')
        .typeText(Selector('#stop-list-pane-2 div div div div div div').nth(2).find('div span span div input'), '90402')
        .click(Selector('#stop-list-pane-2 span').withText('Nürnberg - Gleißbühl').nth(2))
        .click('#stop-list-pane-2 [name="tour.cargos[0].palletExchange"]')
        .click(Selector('#shipmentTabs-pane-1 .btn.btn-success').nth(9))
        .click('#shipmentTabs-pane-1 .btn-xs.btn.btn-success')
        .click('#shipmentTabs-pane-1 .btn-xs.btn.btn-success')
        .click('#shipmentTabs-pane-1 .btn-xs.btn.btn-success')
        .click(Selector('#shipmentTabs-pane-1 .pull-right.btn-xs.btn.btn-default').nth(6))
        .click('#loadSuggestions')
        .typeText(Selector('.rt-th').nth(33).find('input'), '1')
        .typeText(Selector('.rt-th').nth(34).find('input'), '1')
        .wait(5000);

    //At this point, the Radar & FreeTruck matching should have taken place
    //Dependent on the used carrier accounts (different accounts, same account?), check for (each) 'new shipment mail' or check via load suggestions in the carrier assigning modal by
    //filtering matching account(s) (in this example, one account with both FreeTruck & Radar match (1,1));
});