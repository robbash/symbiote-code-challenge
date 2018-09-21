<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Page;

class PagesController extends Controller
{
    //
    public function index()
    {
        return Page::all();
    }

    public function show(Page $page)
    {
        return $page;
    }

    public function store(Request $request)
    {
        if (! Auth::user()) {
            return response()->json(null, 401);
        }

        $this->validate($request, [
            'name' => 'required|unique:pages|max:50',
            'content' => 'required|min:5',
        ]);

        $page = Page::create($request->all());

        return response()->json($page, 201);
    }

    public function update(Request $request, Page $page)
    {
        if (! Auth::user()) {
            return response()->json(null, 401);
        }

        $this->validate($request, [
            'id' => 'required',
            'name' => "required|unique:pages,name,{$page->id}|max:50",
            'content' => 'required|min:5',
        ]);

        $page->update($request->all());

        return response()->json($page, 200);
    }

    public function delete(Page $page)
    {
        if (! Auth::user()) {
            return response()->json(null, 401);
        }

        $page->delete();

        return response()->json(null, 204);
    }
}
