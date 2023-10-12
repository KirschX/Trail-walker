import { render, fireEvent } from "@testing-library/react";
import Controller from "@/components/Controller";

describe("Controller Component", () => {
  it("should render without crashing", () => {
    const mockRef = {
      current: {
        scrollBy: jest.fn(),
      },
    };
    render(<Controller scrollContainerRef={mockRef as any} />);
  });

  it("should scroll left when left button is clicked", () => {
    const mockRef = {
      current: {
        scrollBy: jest.fn(),
      },
    };
    const { getByText } = render(
      <Controller scrollContainerRef={mockRef as any} />
    );
    fireEvent.click(getByText("Left"));
    expect(mockRef.current.scrollBy).toHaveBeenCalledWith({
      left: -200,
      top: 0,
      behavior: "smooth",
    });
  });

  it("should scroll right when right button is clicked", () => {
    const mockRef = {
      current: {
        scrollBy: jest.fn(),
      },
    };
    const { getByText } = render(
      <Controller scrollContainerRef={mockRef as any} />
    );
    fireEvent.click(getByText("Right"));
    expect(mockRef.current.scrollBy).toHaveBeenCalledWith({
      left: 200,
      top: 0,
      behavior: "smooth",
    });
  });
});
