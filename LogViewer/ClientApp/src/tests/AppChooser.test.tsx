import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppChooser } from "../components/AppChooser";
import * as hooks from "../data-fetch/UseGetApplications";
import { Application } from "../data-types/Application";

const mockApps: Array<Application> = [
    {
        ApplicationName: "application",
        ApplicationId: "1",
    },
];

beforeEach(() => {});

afterEach(() => {});

describe("AppChooser", () => {
    it("renders", async () => {
        const setApp = jest.fn();

        jest.spyOn(hooks, "useGetApplications").mockImplementation(() => [
            mockApps,
            false,
            null,
        ]);

        let result = render(<AppChooser setApp={setApp} />);

        expect(result.container).toMatchSnapshot();
    });

    it("calls setApp when app is selected", () => {
        const setApp = jest.fn();

        jest.spyOn(hooks, "useGetApplications").mockImplementation(() => [
            mockApps,
            false,
            null,
        ]);

        let result = render(<AppChooser setApp={setApp} />);

        let select = result.container.querySelector("select");

        expect(select).toBeTruthy();

        select && userEvent.selectOptions(select, "1");

        expect(setApp).toBeCalledWith(mockApps[0]);
    });

    it("shows error when get applications fails", async () => {
        const setApp = jest.fn();

        jest.spyOn(hooks, "useGetApplications").mockImplementation(() => [
            [],
            false,
            "Error!!!",
        ]);

        let result = render(<AppChooser setApp={setApp} />);

        let select = result.container.querySelector("select");
        expect(select).toBeFalsy();

        expect(await screen.findByText("Error!!!")).toBeTruthy();
    });

    it("shows spinner when loading", async () => {
        const setApp = jest.fn();

        jest.spyOn(hooks, "useGetApplications").mockImplementation(() => [
            [],
            true,
            null,
        ]);

        let result = render(<AppChooser setApp={setApp} />);

        let select = result.container.querySelector("select");
        expect(select).toBeFalsy();

        expect(screen.queryAllByRole("status")).toBeTruthy();
    });
});
