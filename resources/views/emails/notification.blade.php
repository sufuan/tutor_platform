@extends('emails.layout')

@section('content')
<h2>{{ $title ?? 'Notification' }}</h2>

@if(isset($lines) && is_array($lines))
    @foreach($lines as $line)
        <p>{!! $line !!}</p>
    @endforeach
@elseif(isset($body))
    <p>{!! $body !!}</p>
@endif

@if(isset($actionText) && isset($actionUrl))
    <div class="button-wrap">
        <a href="{{ $actionUrl }}" class="button">{{ $actionText }}</a>
    </div>
@endif
@endsection
