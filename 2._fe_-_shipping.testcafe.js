import { Selector } from 'testcafe';

fixture `2. FE - Shipping`
    .page `https://cnx-common-root-microfrontend.stage.cnxx.io/login`;

test('2.1. Shipper - Create & Approve Shipment', async t => {
    // Step 1: create & book shipment for shipper account via FE 
    // E.G. use login data from shipper account that was created by previous "1.2.Register New Shipper" autotest
    // test applies very basic shipment specifications, for higher specification see SP Shipping (Pallet Exchange + Additional Stops);

    await t
        .typeText(Selector('#input-username').nth(1), 'stagetest.cargonexx+462@gmail.com')
        .typeText(Selector('#input-password').nth(1), 'test09')
        .click(Selector('#LoginFormWrapper span').withText('Login'))
        .maximizeWindow()
        .click('#single-spa-application\:\@cnx\/dff .bp3-input')
        .typeText('#single-spa-application\:\@cnx\/dff .bp3-input', '48143')
        .click(Selector('#single-spa-application\\:\\@cnx\\/dff span').withText(' Münster - Centrum').nth(3))
        .typeText(Selector('#single-spa-application\\:\\@cnx\\/dff .bp3-input').nth(1), '75015')
        .click(Selector('#single-spa-application\\:\\@cnx\\/dff span').withText(' Bretten - Bauerbach').nth(3));

    //implemented 2 sec stop for price calculation;

    await t
        .wait(2000)
        .click('#single-spa-application\:\@cnx\/dff .Button__ButtonText-sc-2fxer5-1.kWGDgR')
        .click(Selector('#single-spa-application\\:\\@cnx\\/dff .Button__ButtonText-sc-2fxer5-1.kWGDgR').nth(1))
        .typeText(Selector('#tour\\.stops\\[0\\]\\.contact\\.companyName').nth(1), 'ABC Firma')
        .typeText(Selector('#tour\\.stops\\[0\\]\\.address\\.street1').nth(1), 'Neue Straße 7')
        .typeText(Selector('#tour\\.stops\\[0\\]\\.reference').nth(1), '123ABC')
        .typeText(Selector('#tour\\.stops\\[1\\]\\.contact\\.companyName').nth(1), 'XYZ Firma')
        .typeText(Selector('#tour\\.stops\\[1\\]\\.address\\.street1').nth(1), 'Alte Straße 5')
        .typeText(Selector('#tour\\.stops\\[1\\]\\.reference').nth(1), 'XYZ789')
        .click('.Button__ButtonText-sc-2fxer5-1.kWGDgR.ButtonText');

    // Step 2: navigate to SP to approve the booked shipment
    // used the same SP login data as in the "before each hook";

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
        .click('#shipments-dropdown')
        .click(Selector('#root a').withText('Services'));

    // so far 5sec timeout delay implemented to assure that loading shipment table is finished before autotest stops
    // could become redundant due to faster loading times for other executers;

    await t
        .wait(5000);

    // to select the correct shipment to approve from the list, shipper name ("AutoTest Shipper") added to selector specification 
    // so far a more precise selection or filter of the desired shipment from the shipment list is not available;

    await t
        .click(Selector('main div').withText('AutoTest Shipper').nth(9));

    // Dependent on existing FreeTrucks, TourRadars etc., during approval action the shipment could be set to the status "Held for CH" or/and "Held for Platform".
    // According to that the shipment has to be approved ("Freigeben") one or two to be set on shipment status = "Approved"
    // The autotest setup considers two "Freigeben"-Actions. This way the shipment will end up in the correct status for both cases. 
    // However in case the shipment is not set on "Held for CH", autotest might stop at this point, due to one redundant Approval Action. 
    // Anyway shipment will have the correct status for further tests.
    // Update:no additional approval for "Held for Platform" - Status required anymore --> from now on only two instead of three Approve Shipment actions considered;

    await t
        .click(Selector('#shipmentTabs-pane-1 button').withText('Freigeben'))
        .click(Selector('#shipmentTabs-pane-1 button').withText('Freigeben'))
        .click(Selector('span').withText('×'));
});

test('2.2. Carrier - Accept Shipment', async t => {
    // make sure carrier company validation is completed (1.1 or 3.2.) and mail adress is confirmed (optin) manually before shipment can be accepted via FE;

    await t
        .typeText(Selector('#input-username').nth(1), 'stagetest.cargonexx+465@gmail.com')
        .typeText(Selector('#input-password').nth(1), 'test09')
        .click('#LoginFormWrapper .Button__ButtonIcon-sc-2fxer5-2.dylPDC.ButtonIcon')
        .maximizeWindow();

    // to filter for a particular shipment in the open shipment list is not applicable via autotest so far. 
    // Although filter text box can be selected ("#single-spa-application\:\@cnx\/dff div") and defined by certained specifications + desired text, the autotest will not execute this action  
    // Therefore to provide selecting the correct shipment from list (created with test 2.1.), so far the best solution would be:
    // 1.sort list by date with "date furthest in the future"-first 
    // 2.instead of price column (highlighted in orange), select loading place column/section + text = exact postcode of desired shipment (default value equivalent to 2.1)// comment: click action for all columns lead to the same shipment detail modal but they all have different selector names/definitons;

    await t
        .click(Selector('#single-spa-application\\:\\@cnx\\/dff .rt-resizable-header-content').nth(2))
        .click(Selector('#single-spa-application\\:\\@cnx\\/dff .country').withText('48143'))
        .click('.Button__ButtonText-sc-2fxer5-1.kWGDgR.ButtonText')
        .click(Selector('.bp3-icon.bp3-icon-tick').nth(1).find('[data-icon="tick"]'))
        .click('.Button__ButtonText-sc-2fxer5-1.kWGDgR.ButtonText');

    //provide carrier shipment details to standardize the following shipment monitoring test;

    await t
        .typeText(Selector('#vehicle\\.truckLicence').nth(1), 'HH-IT-4565')
        .typeText(Selector('#vehicle\\.trailerLicence').nth(1), 'HH-SP-7889')
        .typeText(Selector('#vehicle\\.driverName').nth(1), 'Franz Fracht')
        .typeText(Selector('.form-control').nth(2), '123456789');

    //create Free-Truck/activate follow up shipment;

    await t
        .click('.Button__ButtonText-sc-2fxer5-1.kWGDgR.ButtonText')
        .click('.Button__ButtonText-sc-2fxer5-1.kWGDgR.ButtonText')
        .click(Selector('.close span').withText('×'));

    //check via 'my shipment list' if shipment was booked correctly;

    await t
        .click(Selector('#single-spa-application\\:\\@cnx\\/navigation span').withText('Meine Aufträge'))
        .wait(2000);
});

test('2.3. Carrier - Shipment Monitoring (regular)', async t => {
    // So far the monitoring autotest faces three problems:
    // 1. Monitoring process can only be autotested if sticking with very linear order of actions. 
    // This means no time changes, delays & exceeded time windows can be autested
    // Reason behind this is based on changing number specifications of the time input fields (#react-select-6--value .Select-value).
    // All selectors for time input fields of the monitoring modal are distinguished by given numbers (see example = 6) 
    // However this numbering changes with every test run, so selectors can not be identified if selected at a certain step of the autotest.
    // 2. Reporting a) actual time of arrival and b)loading finished are based on real time tracking.
    // It is defined that b)cannot be reported at an earlier time than a). 
    // Due to consecutive execution of a) and b) within the autotest both have same time stamp tracked
    // Yet in some cases an error occures because time of a) = b) is processed as b) earlier than a)      
    // 3. Selecting the confirmation button for each monitoring step so far can cause two different outcomes for selector specifications
    // ...depending on weither selecting the text part or the check mark hover of each button
    // the two different specifications are of the pattern: 1.#shipment-booked-modal-pane-1 [data-icon="tick"] or 2. #shipment-booked-modal-pane-1 > withText(...)>nth(1);

    await t
        .typeText(Selector('#input-username').nth(1), 'stagetest.cargonexx+465@gmail.com')
        .typeText(Selector('#input-password').nth(1), 'test09')
        .click('#LoginFormWrapper .Button__ButtonIcon-sc-2fxer5-2.dylPDC.ButtonIcon')
        .maximizeWindow()
        .click(Selector('#single-spa-application\\:\\@cnx\\/navigation span').withText('Meine Aufträge'))
        .click('#single-spa-application\:\@cnx\/dff .rt-resizable-header-content')
        .click('#single-spa-application\:\@cnx\/dff .rt-resizable-header-content')
        .click(Selector('#single-spa-application\\:\\@cnx\\/dff .rt-td').nth(2))
        .click('#shipment-booked-modal-tab-1');

    //carrier shipment details (license info etc.) should be displayed already if autotest 2.2. was executed before
    //in case they are not given, monitoring should also be applicable without;

    await t
        .click(Selector('#shipment-booked-modal-pane-1 span').withText('Speichern').nth(1))
        .click(Selector('#shipment-booked-modal-pane-1 span').withText('ETA bestätigen').nth(1))
        .click(Selector('#shipment-booked-modal-pane-1 span').withText('Ankunft melden').nth(1))
        .click('#shipment-booked-modal-pane-1 .StyledSelect-sc-1cbdm8d-1.hjtUyX')
        .click(Selector('#shipment-booked-modal-pane-1 option').withText('Reine Quittung - ohne Beanstandung geladen'))
        .click(Selector('#shipment-booked-modal-pane-1 span').withText('Beladung melden').nth(1))
        .click(Selector('#shipment-booked-modal-pane-1 span').withText('Speichern').nth(1))
        .click(Selector('#shipment-booked-modal-pane-1 span').withText('ETA bestätigen').nth(1))
        .click(Selector('#shipment-booked-modal-pane-1 span').withText('Ankunft melden').nth(1))
        .click('#shipment-booked-modal-pane-1 .StyledSelect-sc-1cbdm8d-1.hjtUyX')
        .click(Selector('#shipment-booked-modal-pane-1 option').withText('Reine Quittung - ohne Beanstandung entladen'))
        .click(Selector('#shipment-booked-modal-pane-1 span').withText('Entladung melden').nth(1))
        .click(Selector('.close span').withText('×'));

    //check if monitored shipment is listed in 'completed shipments';

    await t
        .click('#single-spa-application\:\@cnx\/dff .Table-components__Tab-sc-1ikqqfd-5.dMyzug')
        .wait(2000);
});

test('2.4. Carrier - Shipment Monitoring (exceed time window)', async t => {
    //This autotest represents the non linear shipment monitoring, which will be applicable if the time field selector specifications are fix for every test run (see comments on 2.3.);

    await t
        .typeText(Selector('#input-username').nth(1), 'stagetest.cargonexx+465@gmail.com')
        .typeText(Selector('#input-password').nth(1), 'test09')
        .click('#LoginFormWrapper .Button__ButtonIcon-sc-2fxer5-2.dylPDC.ButtonIcon')
        .maximizeWindow()
        .click(Selector('#single-spa-application\\:\\@cnx\\/navigation span').withText('Meine Aufträge'))
        .click('#single-spa-application\:\@cnx\/dff .rt-resizable-header-content')
        .click('#single-spa-application\:\@cnx\/dff .rt-resizable-header-content')
        .click(Selector('#single-spa-application\\:\\@cnx\\/dff .rt-td').nth(2))
        .click('#shipment-booked-modal-tab-1');

    //carrier shipment details (license info etc.) should be displayed already if autotest 2.2. was executed before
    //in case they are not given, monitoring should also be applicable without;

    await t
        .click(Selector('#shipment-booked-modal-pane-1 span').withText('Speichern').nth(1))
        .click(Selector('#shipment-booked-modal-pane-1 span').withText('ETA bestätigen').nth(1))
        .click(Selector('#shipment-booked-modal-pane-1 span').withText('Ankunft melden').nth(1))
        .click('#shipment-booked-modal-pane-1 .StyledSelect-sc-1cbdm8d-1.hjtUyX')
        .click(Selector('#shipment-booked-modal-pane-1 option').withText('Reine Quittung - ohne Beanstandung geladen'))
        .click(Selector('#shipment-booked-modal-pane-1 span').withText('Beladung melden').nth(1));

    // Simulating a change in expected ETA which exceeds the predefined standard drop off window (07:00-15:00)
    // Therefore additional notification has to be confirmed;

    await t
        .click('#react-select-6--value .Select-value')
        .typeText(Selector('#react-select-6--value div').nth(1).find('input'), '16:00')
        .pressKey('enter')
        .click(Selector('#shipment-booked-modal-pane-1 [data-icon="tick"]').nth(6))
        .click(Selector('#shipment-booked-modal-pane-1 span').withText('Speichern').nth(1))
        .click(Selector('#shipment-booked-modal-pane-1 [data-icon="tick"]').nth(7))
        .click(Selector('#shipment-booked-modal-pane-1 span').withText('ETA bestätigen').nth(1))
        .click(Selector('#shipment-booked-modal-pane-1 span').withText('Ankunft melden').nth(1))
        .click('#shipment-booked-modal-pane-1 .StyledSelect-sc-1cbdm8d-1.hjtUyX')
        .click(Selector('#shipment-booked-modal-pane-1 option').withText('Reine Quittung - ohne Beanstandung entladen'))
        .click(Selector('#shipment-booked-modal-pane-1 span').withText('Entladung melden').nth(1))
        .click(Selector('.close span').withText('×'));

    //check if monitored shipment is listed in 'completed shipments';

    await t
        .click('#single-spa-application\:\@cnx\/dff .Table-components__Tab-sc-1ikqqfd-5.dMyzug')
        .wait(2000);
});