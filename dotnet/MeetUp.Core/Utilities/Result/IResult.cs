namespace MeetUp.Core.Utilities.Result
{

    public interface IResult
    {
        bool IsSuccess { get; }
        string Message { get; }
    }

}
