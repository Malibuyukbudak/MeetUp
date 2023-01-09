using FluentValidation;
using MediatR;

namespace MeetUp.Core.Behaviours
{
    public class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
    {
        private readonly IEnumerable<IValidator<TRequest>> _validators;

        public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
        {
            _validators = validators;
        }

        public Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {

            ValidationContext<object> context = new(request);
            List<FluentValidation.Results.ValidationFailure> failures = _validators
                                               .Select(validator => validator.Validate(context))
                                               .SelectMany(result => result.Errors)
                                               .Where(failure => failure != null)
                                               .ToList();

            if (failures.Count != 0) throw new FluentValidation.ValidationException(failures);
            return next();

        }
    }
}
