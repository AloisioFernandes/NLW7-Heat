defmodule TagsHeatWeb.MessagesController do
  use TagsHeatWeb, :controller

  alias TagsHeat.Message
  alias TagsHeat.Messages.Create

  def create(conn, params) do
    params
    |> Create.call()
    |> handle_create(conn)
  end

  defp handle_create({:ok, %Message{}}, conn) do
  end

  defp handle_create({:error, %{result: result, status: status}}, conn) do
  end
end
