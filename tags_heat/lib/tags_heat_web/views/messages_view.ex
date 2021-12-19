defmodule TagsHeatWeb.MessagesView do
  use TagsHeatWeb, :view

  def render("create.json", %{message: message}) do
    %{
      result: "Message created!",
      message: message
    }
  end
end
