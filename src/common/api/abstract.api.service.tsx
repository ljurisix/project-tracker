import { from, Observable } from 'rxjs';
import { logoutAction, store } from '../redux';
import { getErrorMessageFromCode } from './handleErrorMessage.service';
export default {
  GET,
  POST,
  PUT,
  DELETE,
  PATCH,
  getUrlQueryParams,
};

/**
 * GET request factory
 *
 * @param {string}    path          Resource path
 * @param {object}    params        Request query params
 */
function GET(path: string, params?: HttpParamsTypes, showLoader?: boolean): Observable<any> {
  const requestOptions = {
    method: 'GET',
    headers: httpHeader(),
  };

  let url = [process.env.REACT_APP_API_URL, path].join('/');
  url = getUrlWithParams(url, params);

  showLoader = showLoader === undefined ? true : showLoader;

  showLoader && startLoader();

  try {
    return from(
      fetch(url, requestOptions)
        .then(parseResponse)
        .then(showLoader ? endLoader : (r) => r)
        .catch((error) => {
          endLoader(showLoader);
          throw error;
        })
    );
  } catch (error) {
    endLoader(showLoader);
    throw error;
  }
}

/**
 * POST request factory
 *
 * @param {string}    path          Resource path
 * @param {object}    body          Request payload
 * @param {object}    params        Request query params
 */
function POST(path: string, body: any, params?: HttpParamsTypes): Observable<any> {
  const isFormData = (body instanceof FormData);
  
  const requestOptions = {
    method: 'POST',
    headers: {
      ...httpHeader(),
      'Content-Type': 'application/json',
    },
    body: isFormData ? body : JSON.stringify(body),
  };

  if (!isFormData) {
    requestOptions.headers['Content-Type'] = 'application/json';
  }

  let url = [process.env.REACT_APP_API_URL, path].join('/');
  url = getUrlWithParams(url, params);

  startLoader();

  return from(
    fetch(url, requestOptions)
      .then(parseResponse)
      .then(endLoader)
      .catch((error) => {
        endLoader();
        throw error;
      })
  );
}

/**
 * PUT request factory
 *
 * @param {string}    path          Resource path
 * @param {object}    body          Request payload
 * @param {object}    params        Request query params
 */
function PUT(path: string, body: any, params?: HttpParamsTypes): Observable<any> {
  const requestOptions = {
    method: 'PUT',
    headers: {
      ...httpHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  let url = [process.env.REACT_APP_API_URL, path].join('/');
  url = getUrlWithParams(url, params);

  startLoader();

  return from(
    fetch(url, requestOptions)
      .then(parseResponse)
      .then(endLoader)
      .catch((error) => {
        endLoader();
        throw error;
      })
  );
}

function PATCH(path: string, body: any, params?: HttpParamsTypes): Observable<any> {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      ...httpHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  let url = [process.env.REACT_APP_API_URL, path].join('/');
  url = getUrlWithParams(url, params);

  startLoader();

  return from(
    fetch(url, requestOptions)
      .then(parseResponse)
      .then(endLoader)
      .catch((error) => {
        endLoader();
        throw error;
      })
  );
}

/**
 * DELETE request factory
 *
 * @param {string}    path          Resource path
 * @param {object}    params        Request query params
 */
function DELETE(path: string, params?: HttpParamsTypes): Observable<any> {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      ...httpHeader(),
      'Content-Type': 'application/json',
    },
  };

  let url = [process.env.REACT_APP_API_URL, path].join('/');
  url = getUrlWithParams(url, params);

  startLoader();

  return from(
    fetch(url, requestOptions)
      .then(parseResponse)
      .then(endLoader)
      .catch((error) => {
        endLoader();
        throw error;
      })
  );
}

// ====== PRIVATE UTILS ======

function getUrlWithParams(url: string, params?: HttpParamsTypes) {
  if (params === null) return url;

  let p: string = '';
  if (params) {
    p = '?';
    let keys = Object.keys(params);
    for (let i in keys) {
      if (p !== '?') p += '&';
      p += encodeURIComponent(keys[i]) + '=' + encodeURIComponent(params[keys[i]]);
    }
  }

  return [url, p].join('');
}

/**
 * Requests header generator
 */
export function httpHeader() {
  let header: any = {};
  var APP_TOKEN;

  let currentState: any = store.getState();

  if (currentState?.auth?.isAuthenticated) {
    APP_TOKEN = currentState.auth.accessToken;
  }

  if (APP_TOKEN) header['Authorization'] = 'Bearer ' + APP_TOKEN;

  return header;
}

function parseResponse(response: any) {
  return response.text().then((text: any) => {
    let data;

    try {
      data = text && JSON.parse(text);
    } catch (e) {
      data = null;
    }

    if (!response.ok) {
      if (!response.url.includes('/auth/login') && response.status === 401) {
        store.dispatch(logoutAction());
        localStorage.clear();
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 100);
        throw response;
      }

      throw data;
    }

    return data;
  });
}

var LOADER__COUNT = 0;

function startLoader(response?: any) {
  LOADER__COUNT++;
  let el: any = document.getElementById('global-loader');
  let el2: any = document.getElementById('global-loader-wrap');
  el.style.display = 'block';
  el2.style.display = 'block';
  return response;
}

function endLoader(response?: any) {
  LOADER__COUNT--;
  if (LOADER__COUNT === 0) {
    let el: any = document.getElementById('global-loader');
    let el2: any = document.getElementById('global-loader-wrap');
    el.style.display = 'none';
    el2.style.display = 'none';
  }
  return response;
}

// ====== UTILS ======

export function getUrlQueryParams(
  pagination?: Pagination,
  sorter?: Sorter,
  filters?: Array<QueryFilter>,
  other?: any
): HttpParamsTypes {
  let params: HttpParamsTypes = {};

  if (pagination) {
    params.pagination = 'true';
    params.pageNumber = pagination.current.toString();
    params.perPage = pagination.pageSize.toString();
  } else {
    params.pagination = 'false';
  }

  if (sorter && sorter.columnKey) {
    params.sortAttr = sorter.columnKey;
    params.sortDir = sorter.order || 'ascend';
  }

  if (filters) {
    params.filter = filters.map((x) => [x.name, x.operator, x.value].join('!')).join(';');
  }

  if (other) {
    params = { ...params, ...other };
  }

  return params;
}

export const DefaultPagination: Pagination = {
  current: 1,
  pageSize: 15,
  total: 0, //not important on call
};

export const createPaginationFromRequest = (request: any): Pagination => ({
  from: request.from,
  to: request.to,
  current: request.current_page,
  pageSize: request.per_page,
  total: request.total,
});

// ====== INTERFACES ======

export type HttpParamsTypes = { [index: string]: string };

export type QueryFilter = { name: string; operator: string; value: string };

export interface Pagination {
  current: number;
  pageSize: number;
  total: number;
  from?: number;
  to?: number;
}

export interface Sorter {
  column?: {
    title: string;
    dataIndex: string;
    sorter: boolean;
  };
  order?: string;
  field?: string;
  columnKey?: string;
}
