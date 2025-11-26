import { renderHook, act } from "@testing-library/react";
import { useRegister } from "../useRegister";

describe("useRegister", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("deve cadastrar com sucesso", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "ok" }),
    });

    const { result } = renderHook(() => useRegister());

    act(() => {
      result.current.setName("Pedro");
      result.current.setEmail("pedro@gmail.com");
      result.current.setPassword("1234");
    });

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: () => {},
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(result.current.warning).toBe("");
  });
});
