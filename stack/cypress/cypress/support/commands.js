// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
const extractCookieValue = (response, cookieName) => {
  const setCookieHeader = response.headers['set-cookie'];

  const cookie = setCookieHeader.find((cookie) => cookie.startsWith(`${cookieName}=`));
  if (!cookie) {
    cy.log(response);
    throw new Error("CSRF token cookie not found in server response");
  }
  const cookieVal = cookie.split(";")[0].split("=")[1];
  return cookieVal
};

// cypress/support/commands.js
Cypress.Commands.add(
  "loginBackground",
  (email, pass) => {
    cy.request({
      method: "GET",
      failOnStatusCode: false,
      url: Cypress.env("REACT_APP_API_HOST") + "/_allauth/browser/v1/config"
    }).then((configres) => {
      cy.log("CONFIG REQ", configres);

      const csrfToken = extractCookieValue(configres, "csrftoken");
      cy.log(`Background logging ${email} with CSRF token ${csrfToken}`);
      cy.setCookie("csrftoken", csrfToken);

      cy.request({
        withCredentials: true,
        failOnStatusCode: false,
        httpsAgent: new (require("https").Agent)({ rejectUnauthorized: false }), // Handle HTTPS requests
        method: "POST",
        url: `${Cypress.env("REACT_APP_API_HOST")}/_allauth/browser/v1/auth/login`,
        headers: {
          "Referer": new URL(Cypress.env("REACT_APP_APP_HOST") || "").host,  // Adding Referer header to simulate request origin
          "Origin": Cypress.env("REACT_APP_APP_HOST"),    // Adding Origin header to simulate request origin
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken
        },
        body: {
          email: email,
          password: pass
        }
      }).then((sessionres) => {
        cy.log("SESSION REQ", sessionres);

        const sessionId = extractCookieValue(sessionres, "sessionid");
        cy.log(`Background logging ${email} with Session ID: ${sessionId}`);
        cy.setCookie("sessionid", sessionId);
        cy.visit('/');
      });
    });
  });

Cypress.Commands.add(
  "showLogin",
  (email, pass) => {
    cy.grab(`a[href="/account/login" i]`).showClick();
    cy.grab(`[type="email"]`).type(email);
    cy.grab(`[type="password"]`).type(pass);
    cy.intercept(`**/_allauth/**`).as("waitForLogin");
    cy.grab("button[type=\"submit\" i]").showClick();
    cy.wait("@waitForLogin");
    cy.visit('/');
  });

Cypress.Commands.add("showClick",
  { prevSubject: "element" },
  (subject) => {
    Cypress.$("#cypressHand").addClass("pulse");
    setTimeout((e) => {
      Cypress.$("#cypressHand").removeClass("pulse");
    }, 1000);
    cy.wrap(subject).click({ force: true });
  }
);

Cypress.Commands.add("grab", (sel) => {
  cy.get(sel, { force: true, includeShadowDom: true, timeout: 6000 }).first().then(($el) => {
    const midY = $el.offset().top + $el.height() / 2;
    const midX = $el.offset().left + ($el.get(0).nodeName.toLowerCase() === "input" ? 5 : $el.width() / 2);

    // console.log("GRAB DEST: " + midX + ' ' + midY);

    // if (midY >= document.documentElement.clientHeight + window.scrollHeight && midY <= document.documentElement.clientHeight) {
    // cy.scrollTo(0, midY);
    $el.get(0).scrollIntoViewIfNeeded(true);
    // }

    Cypress.$("#cypressHand").animate(
      { top: midY, left: midX },
      {
        duration: 200,
        easing: "linear"
        /* always: () => {
            if (resolved === false) {
                resolve($el);
            }
        },
        fail: () => {
            // reject('missing hand or' + sel);
        }
         */
      }
    );
  });
});

Cypress.Commands.add("clickIf", (selector) => {
  if (cy.ifExists(selector)) {
    cy.grab(selector).showClick();
  }
  cy.get("body");
});

Cypress.Commands.add("ifExists", (ele) => {
  return cy.get("body")
    .find(ele)
    .its("length")
    .then((res) => {
      if (res > 0) {
        console.log("exists: " + ele);
        return true;
      }
      console.log("DOES NOT EXIST: " + ele);
      return false;
    });

});

Cypress.Commands.add("addHand", (theme) => {
  cy.document().then(dom => {
    const src = theme === "dark" ? "/assets/my_location-white-18dp.svg" : "/assets/my_location-black-18dp.svg";
    if (dom.getElementById("cypressHand")) {
      dom.getElementById("cypressHand").src = src;
    } else {
      cy.get("body").then(($body) => {
        const img = dom.createElement("IMG");
        img.src = src;
        img.width = 18;
        img.height = 18;
        img.id = "cypressHand";
        $body.append(img);
        // Cypress.$("body").append(img);
        // $body.get(0).appendChild(img);
        console.log("Added Hand", img);
      });
    }
  });
  cy.get("#cypressHand").should("exist");
});

Cypress.Commands.add("assertMenuReady", () => {
  cy.get("[aria-label=\"Main Navigation\"]", { timeout: 10000 }).should("exist");
});

Cypress.Commands.add("assertForm", () => {
  cy.get("#GenericForm").should("exist");
});

Cypress.Commands.add("assertEntityView", () => {
  cy.get("#EntityView").should("exist");
});

Cypress.Commands.add("assertListView", () => {
  cy.get("#EntityList").should("exist");
});

Cypress.Commands.add("openDrawer", () => {
  cy.grab("[aria-label=\"Open Drawer\"]").showClick(true);
});

Cypress.Commands.add("assertAuthenticated", () => {
  cy.window().its("store").invoke("getState").its("auth").should("have.a.property", "me");
  // cy.get('#mainheader[aria-label="authenticated"]', {timeout: 10000}).should('exist');
});
