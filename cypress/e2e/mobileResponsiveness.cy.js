// This test suite checks the responsiveness of a web application across different mobile and desktop viewports.
const devices = [
    { viewport: "macbook-15", type: "desktop" },
    { viewport: "ipad-2", type: "mobile" },
    { viewport: [1280, 720], type: "desktop" },
    { viewport: [375, 667], type: "mobile" },
];

describe('devices moviles', () => {


    devices.forEach(device => {
        it(`Prueba con el viewport ${device.viewport}`, () => {
            if (Cypress._.isArray(device.viewport)) {
                cy.viewport(device.viewport[0], device.viewport[1]);
            } else {
                cy.viewport(device.viewport);
            }
            cy.visit('/');

            if (device.type === 'desktop') {
                cy.contains("Safari").should("exist");
            } else {
                cy.contains("Safari").should("not.be.visible");
            }
        });
    });
});
