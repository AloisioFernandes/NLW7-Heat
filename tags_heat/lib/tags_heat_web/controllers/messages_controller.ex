defmodule TagsHeatWeb.MessagesController do
  use TagsHeatWeb, :controller

  alias TagsHeat.Message
  alias TagsHeat.Messages.Create

  def create(conn, params) do
    params
    |> Create.call()
    |> handle_create(conn)
  end

  defp handle_create({:ok, %Message{} = message}, conn) do
    conn
    |> put_status(:created)
    |> render("create.json", message: message)
  end

  defp handle_create({:error, %{result: result, status: status}}, conn) do
  end
end
# 57:30
