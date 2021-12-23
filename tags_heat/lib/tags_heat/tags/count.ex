defmodule TagsHeat.Tags.Count do
  alias TagsHeat.Messages.Get

  def call do
    messages = Get.today_messages()

    Task.async_stream(messages, fn message ->
      message.message
      |> String.split()
      |> Enum.frequencies()
    end)
    |> IO.inspect()
  end
end
