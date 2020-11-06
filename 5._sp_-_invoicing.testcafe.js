import { Selector } from 'testcafe';

fixture `5. SP - Invoicing`
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

test('Billing', async t => {
    //Make sure Shipper & Carrier Invoice Options are standardized to perfom test succesfully. To provide these settings create a shipper via 4.1. SP-Create Shipper Company & Carrier via 4.2. SP-Create Carrier
    //Make sure a shipment in Status = "completed" is available in the shipment table before executing this test. To provide such a shipment perform a Book Shipment & Assign Carrier Autotest (Standard or Pallet Exchange) + 5.5. Monitor Shipment.;

    await t
        .maximizeWindow()
        .click('#shipments-dropdown')
        .click(Selector('#root a').withText('Services'))
        .wait(10000);

    // select 'Ready for Billing?' Table = completed shipments not yet set on ready for billing;

    await t
        .click(Selector('main [name="radioGroup"]').nth(1));

    //additional 'Reload Shipments'-action is not necessarily required but due to occured issues regarding correct order of previous actions, this was implemented for additional process safety;

    await t
        .click(Selector('main .btn.btn-info').nth(1))
        .click(Selector('main div').withText('AutoTest Shipper').nth(9))
        .click('#shipmentTabs-pane-1 .btn-xs.btn.btn-success');

    //set a completed shipment to "ready for billing"
    //autotest explicitly selects a 'AutoTest Shipper' - Shipment in accordance to the overall autotest process;

    await t
        .click(Selector('.close span').withText('×'))
        .click(Selector('#root .btn.btn-default').nth(4));

    // switch to Invoicing Table
    // billing actions are executed in linear (consecutive from left to right) not logical order due to missing indivual button specifications for non-linear selection;

    await t
        .click('main .btn.btn-success')
        .click('main .btn.btn-success')
        .click('main .btn.btn-success')
        .click('main .btn.btn-success')
        .click('main .btn.btn-success')
        .click('main .btn.btn-success')
        .click('main .btn.btn-success')
        .click(Selector('main .btn.btn-success').nth(1))
        .click(Selector('main .btn.btn-success').nth(1));

    // check if billing status for edited shipment = 'completed' after test is executed;

    await t
        .click(Selector('main .rt-td').nth(1))
        .wait(2000)
        .click(Selector('.close span').withText('×'));
});