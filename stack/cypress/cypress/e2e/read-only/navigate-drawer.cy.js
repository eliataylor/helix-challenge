import { NAVITEMS } from "../../support/types";

describe("helixai navigate drawer", async () => {
    beforeEach(() => {
        cy.loginBackground(Cypress.env("email"), Cypress.env("password")).then(e => {
            console.log(e);
        });
    })

    it("helixai navigate drawer", () => {

        cy.viewport(Cypress.env("viewportWidth"), Cypress.env("viewportHeight"));
        cy.visit(Cypress.env("REACT_APP_APP_HOST"));
        cy.assertMenuReady();

        NAVITEMS.forEach(navItem => {
            // cy.intercept('GET', `${navItem.api}*`).as(`Get${navItem.type}`) // wildcard for query params
            if (navItem.type === "Users" || navItem.model_type === "vocabulary") return true;
            cy.grab(`[aria-label="Main Navigation" i] a[href="/${navItem.segment}" i]`).showClick();
            cy.get(`[aria-label="${navItem.type} Card" i]`, { timeout: 10000 }).should('exist');
            /* cy.wait(`@Get${navItem.type}`).then((interception) => {
                expect(interception.response).to.exist;
                expect(interception.response.statusCode).to.eq(200);
            });
            */
        })

    })
})
