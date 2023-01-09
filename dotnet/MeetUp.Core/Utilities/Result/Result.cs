using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
namespace MeetUp.Core.Utilities.Result
{


    public class Result : IResult
    {
        public bool IsSuccess { get; }

        public string Message { get; } = string.Empty;
        public Result(string message, bool success)
        {
            Message = message;
            IsSuccess = success;
        }
        public static Result Success(string message = "")
        {
            return new Result(message, true);
        }

        public static Result Error(string message = "")
        {
            return new Result(message, false);
        }

        public override string ToString() => JsonConvert.SerializeObject(this,
            new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });

    }
    public class Result<T> : IResult
    {
        public T Data { get; }
        public bool IsSuccess { get; }
        public string Message { get; }
        public Result(T data, string message, bool success)
        {
            Data = data;
            IsSuccess = success;
            Message = message;
        }

        public static Result<T> Success(T data, string message = "")
        {
            return new Result<T>(data, message, true);
        }

        public static Result<T> Error(string message)
        {
            return new Result<T>(default, message, false);
        }

        public override string ToString() => JsonConvert.SerializeObject(this,
                    new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
    }

}