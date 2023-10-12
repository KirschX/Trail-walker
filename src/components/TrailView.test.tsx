import { render, fireEvent } from "@testing-library/react";

let mockUpdateTrackingState = jest.fn();

jest.mock("@/store/store", () => ({
  useTrackingState: jest.fn().mockReturnValue({
    currentLocation: 0,
    updateTrackingState: mockUpdateTrackingState,
  }),
}));

const TrailView = require("@/components/TrailView").default;

describe("TrailView Component", () => {
  const mockRef = {
    current: {
      scrollBy: jest.fn(),
      scrollWidth: 500, // Mock value
    },
  };

  beforeEach(() => {
    mockUpdateTrackingState.mockClear();
  });

  it("should render without crashing", () => {
    render(<TrailView scrollContainerRef={mockRef as any} />);
  });

  it("should navigate when Go button is clicked", () => {
    const { getByText } = render(
      <TrailView scrollContainerRef={mockRef as any} />
    );

    fireEvent.click(getByText("Go"));

    expect(mockUpdateTrackingState).toHaveBeenCalled();
  });
});
