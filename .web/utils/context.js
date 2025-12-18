import { createContext, useContext, useMemo, useReducer, useState, createElement, useEffect } from "react"
import { applyDelta, ReflexEvent, hydrateClientStorage, useEventLoop, refs } from "$/utils/state"
import { jsx } from "@emotion/react";

export const initialState = {"reflex___state____state": {"is_hydrated_rx_state_": false, "router_rx_state_": {"session": {"client_token": "", "client_ip": "", "session_id": ""}, "headers": {"host": "", "origin": "", "upgrade": "", "connection": "", "cookie": "", "pragma": "", "cache_control": "", "user_agent": "", "sec_websocket_version": "", "sec_websocket_key": "", "sec_websocket_extensions": "", "accept_encoding": "", "accept_language": "", "raw_headers": {}}, "page": {"host": "", "path": "", "raw_path": "", "full_path": "", "full_raw_path": "", "params": {}}, "url": "", "route_id": ""}}, "reflex___state____state.reflex___state____frontend_event_exception_state": {}, "reflex___state____state.reflex___state____on_load_internal_state": {}, "reflex___state____state.reflex___state____update_vars_internal_state": {}, "reflex___state____state.state____global_state": {"role_rx_state_": "", "session_restored_rx_state_": false, "tenant_id_rx_state_": 0, "token_rx_state_": "", "user_data_rx_state_": {}, "user_id_rx_state_": 0, "username_rx_state_": ""}, "reflex___state____state.state____global_state.pages___auth____auth_state": {"is_loading_rx_state_": false, "login_error_rx_state_": "", "login_password_rx_state_": "", "login_tenant_id_rx_state_": "", "login_username_rx_state_": "", "reg_error_rx_state_": "", "reg_full_name_rx_state_": "", "reg_password_rx_state_": "", "reg_success_rx_state_": false, "reg_tenant_address_rx_state_": "", "reg_tenant_city_rx_state_": "", "reg_tenant_email_rx_state_": "", "reg_tenant_gstin_rx_state_": "", "reg_tenant_name_rx_state_": "", "reg_tenant_phone_rx_state_": "", "reg_tenant_pincode_rx_state_": "", "reg_tenant_state_rx_state_": "", "reg_username_rx_state_": ""}, "reflex___state____state.state____global_state.pages___customers____customer_state": {"customer_gstins_rx_state_": [], "customer_ids_rx_state_": [], "customer_indices_rx_state_": [], "customer_names_rx_state_": [], "customer_outstanding_balances_rx_state_": [], "customer_phones_rx_state_": [], "customers_rx_state_": [], "editing_id_rx_state_": 0, "error_message_rx_state_": "", "form_address_rx_state_": "", "form_city_rx_state_": "", "form_email_rx_state_": "", "form_gstin_rx_state_": "", "form_name_rx_state_": "", "form_phone_rx_state_": "", "form_pincode_rx_state_": "", "form_state_rx_state_": "", "is_loading_rx_state_": false, "selected_customer_id_rx_state_": 0, "show_form_rx_state_": false, "success_message_rx_state_": ""}, "reflex___state____state.state____global_state.pages___dashboard____dashboard_state": {"is_loading_rx_state_": false, "low_stock_count_rx_state_": 0, "low_stock_items_rx_state_": [], "outstanding_payables_rx_state_": 0.0, "outstanding_receivables_rx_state_": 0.0, "purchases_display_rx_state_": [], "recent_purchases_rx_state_": [], "recent_sales_rx_state_": [], "sales_display_rx_state_": [], "stock_display_rx_state_": [], "total_customers_rx_state_": 0, "total_products_rx_state_": 0, "total_purchases_rx_state_": 0.0, "total_sales_rx_state_": 0.0, "total_suppliers_rx_state_": 0}, "reflex___state____state.state____global_state.pages___outstanding____outstanding_state": {"is_loading_rx_state_": false, "payables_rx_state_": [], "payables_amounts_rx_state_": [], "payables_indices_rx_state_": [], "payables_supplier_names_rx_state_": [], "receivables_rx_state_": [], "receivables_amounts_rx_state_": [], "receivables_customer_names_rx_state_": [], "receivables_indices_rx_state_": [], "total_payables_rx_state_": 0.0, "total_receivables_rx_state_": 0.0}, "reflex___state____state.state____global_state.pages___products____product_state": {"editing_id_rx_state_": 0, "error_message_rx_state_": "", "form_category_id_rx_state_": 0, "form_current_stock_rx_state_": 0.0, "form_description_rx_state_": "", "form_hsn_code_rx_state_": "", "form_name_rx_state_": "", "form_purchase_price_rx_state_": 0.0, "form_reorder_level_rx_state_": 0.0, "form_sale_price_rx_state_": 0.0, "form_sku_rx_state_": "", "form_tax_rate_rx_state_": 0.0, "form_unit_rx_state_": "PCS", "is_loading_rx_state_": false, "product_hsn_codes_rx_state_": [], "product_ids_rx_state_": [], "product_indices_rx_state_": [], "product_is_used_rx_state_": [], "product_names_rx_state_": [], "product_reorder_levels_rx_state_": [], "product_sale_prices_rx_state_": [], "product_skus_rx_state_": [], "product_stocks_rx_state_": [], "product_tax_rates_rx_state_": [], "product_units_rx_state_": [], "products_rx_state_": [], "selected_product_id_rx_state_": 0, "show_form_rx_state_": false, "success_message_rx_state_": ""}, "reflex___state____state.state____global_state.pages___purchases____purchase_state": {"current_item_product_id_rx_state_": 0, "current_item_quantity_rx_state_": "", "current_item_tax_rate_rx_state_": "0", "current_item_unit_price_rx_state_": "", "editing_id_rx_state_": 0, "error_message_rx_state_": "", "form_due_date_rx_state_": "", "form_invoice_date_rx_state_": "", "form_notes_rx_state_": "", "form_paid_amount_rx_state_": 0.0, "form_supplier_id_rx_state_": 0, "invoice_dates_rx_state_": [], "invoice_detail_date_rx_state_": "", "invoice_detail_number_rx_state_": "", "invoice_detail_paid_rx_state_": 0.0, "invoice_detail_status_rx_state_": "", "invoice_detail_supplier_rx_state_": "", "invoice_detail_total_rx_state_": 0.0, "invoice_ids_rx_state_": [], "invoice_indices_rx_state_": [], "invoice_numbers_rx_state_": [], "invoice_total_rx_state_": 0.0, "invoices_rx_state_": [], "is_loading_rx_state_": false, "item_indices_rx_state_": [], "item_product_ids_rx_state_": [], "item_product_names_rx_state_": [], "item_quantities_rx_state_": [], "item_tax_rates_rx_state_": [], "item_totals_rx_state_": [], "item_unit_prices_rx_state_": [], "paid_amounts_rx_state_": [], "payment_amount_rx_state_": "", "product_options_rx_state_": [], "products_rx_state_": [], "selected_invoice_id_rx_state_": 0, "show_details_id_rx_state_": 0, "show_form_rx_state_": false, "show_payment_form_rx_state_": false, "statuses_rx_state_": [], "success_message_rx_state_": "", "supplier_names_rx_state_": [], "supplier_options_rx_state_": [], "suppliers_rx_state_": [], "total_amounts_rx_state_": []}, "reflex___state____state.state____global_state.pages___reports____report_state": {"is_loading_rx_state_": false, "purchase_report_rx_state_": {}, "sales_report_rx_state_": {}}, "reflex___state____state.state____global_state.pages___sales____sales_state": {"current_item_product_id_rx_state_": 0, "current_item_quantity_rx_state_": "", "current_item_tax_rate_rx_state_": "0", "current_item_unit_price_rx_state_": "", "customer_names_rx_state_": [], "customer_options_rx_state_": [], "customers_rx_state_": [], "error_message_rx_state_": "", "form_customer_id_rx_state_": 0, "form_due_date_rx_state_": "", "form_invoice_date_rx_state_": "", "form_invoice_type_rx_state_": "B2B", "form_notes_rx_state_": "", "form_paid_amount_rx_state_": 0.0, "form_place_of_supply_rx_state_": "", "invoice_dates_rx_state_": [], "invoice_detail_customer_rx_state_": "", "invoice_detail_date_rx_state_": "", "invoice_detail_number_rx_state_": "", "invoice_detail_paid_rx_state_": 0.0, "invoice_detail_status_rx_state_": "", "invoice_detail_total_rx_state_": 0.0, "invoice_ids_rx_state_": [], "invoice_indices_rx_state_": [], "invoice_numbers_rx_state_": [], "invoice_total_rx_state_": 0.0, "invoices_rx_state_": [], "is_loading_rx_state_": false, "item_indices_rx_state_": [], "item_product_ids_rx_state_": [], "item_product_names_rx_state_": [], "item_quantities_rx_state_": [], "item_tax_rates_rx_state_": [], "item_totals_rx_state_": [], "item_unit_prices_rx_state_": [], "paid_amounts_rx_state_": [], "payment_amount_rx_state_": "", "product_options_rx_state_": [], "products_rx_state_": [], "selected_invoice_id_rx_state_": 0, "show_details_id_rx_state_": 0, "show_form_rx_state_": false, "show_payment_form_rx_state_": false, "statuses_rx_state_": [], "success_message_rx_state_": "", "total_amounts_rx_state_": [], "warning_message_rx_state_": ""}, "reflex___state____state.state____global_state.pages___settings____settings_state": {"business_address_rx_state_": "", "business_city_rx_state_": "", "business_email_rx_state_": "", "business_gstin_rx_state_": "", "business_name_rx_state_": "", "business_phone_rx_state_": "", "business_pincode_rx_state_": "", "business_state_rx_state_": "", "error_message_rx_state_": "", "footer_text_rx_state_": "", "purchase_prefix_rx_state_": "PINV", "purchase_start_number_rx_state_": 1, "sales_prefix_rx_state_": "INV", "sales_start_number_rx_state_": 1, "success_message_rx_state_": "", "terms_conditions_rx_state_": ""}, "reflex___state____state.state____global_state.pages___stocks____stock_state": {"error_message_rx_state_": "", "is_loading_rx_state_": false, "product_ids_rx_state_": [], "product_indices_rx_state_": [], "product_names_rx_state_": [], "product_names_tx_rx_state_": [], "product_reorder_levels_rx_state_": [], "product_skus_rx_state_": [], "product_stocks_rx_state_": [], "product_units_rx_state_": [], "products_rx_state_": [], "quantities_rx_state_": [], "transaction_dates_rx_state_": [], "transaction_ids_rx_state_": [], "transaction_indices_rx_state_": [], "transaction_types_rx_state_": [], "transactions_rx_state_": []}, "reflex___state____state.state____global_state.pages___suppliers____supplier_state": {"editing_id_rx_state_": 0, "error_message_rx_state_": "", "form_address_rx_state_": "", "form_city_rx_state_": "", "form_email_rx_state_": "", "form_gstin_rx_state_": "", "form_name_rx_state_": "", "form_phone_rx_state_": "", "form_pincode_rx_state_": "", "form_state_rx_state_": "", "is_loading_rx_state_": false, "selected_supplier_id_rx_state_": 0, "show_form_rx_state_": false, "success_message_rx_state_": "", "supplier_gstins_rx_state_": [], "supplier_ids_rx_state_": [], "supplier_indices_rx_state_": [], "supplier_names_rx_state_": [], "supplier_outstanding_balances_rx_state_": [], "supplier_phones_rx_state_": [], "suppliers_rx_state_": []}, "reflex___state____state.state____global_state.pages___users____user_state": {"editing_id_rx_state_": 0, "emails_rx_state_": [], "error_message_rx_state_": "", "form_email_rx_state_": "", "form_full_name_rx_state_": "", "form_password_rx_state_": "", "form_role_rx_state_": "BILLING", "form_username_rx_state_": "", "full_names_rx_state_": [], "is_active_flags_rx_state_": [], "is_loading_rx_state_": false, "roles_rx_state_": [], "show_form_rx_state_": false, "success_message_rx_state_": "", "user_ids_rx_state_": [], "user_indices_rx_state_": [], "usernames_rx_state_": [], "users_rx_state_": []}}

export const defaultColorMode = "system"
export const ColorModeContext = createContext(null);
export const UploadFilesContext = createContext(null);
export const DispatchContext = createContext(null);
export const StateContexts = {reflex___state____state: createContext(null),reflex___state____state__reflex___state____frontend_event_exception_state: createContext(null),reflex___state____state__reflex___state____on_load_internal_state: createContext(null),reflex___state____state__reflex___state____update_vars_internal_state: createContext(null),reflex___state____state__state____global_state: createContext(null),reflex___state____state__state____global_state__pages___auth____auth_state: createContext(null),reflex___state____state__state____global_state__pages___customers____customer_state: createContext(null),reflex___state____state__state____global_state__pages___dashboard____dashboard_state: createContext(null),reflex___state____state__state____global_state__pages___outstanding____outstanding_state: createContext(null),reflex___state____state__state____global_state__pages___products____product_state: createContext(null),reflex___state____state__state____global_state__pages___purchases____purchase_state: createContext(null),reflex___state____state__state____global_state__pages___reports____report_state: createContext(null),reflex___state____state__state____global_state__pages___sales____sales_state: createContext(null),reflex___state____state__state____global_state__pages___settings____settings_state: createContext(null),reflex___state____state__state____global_state__pages___stocks____stock_state: createContext(null),reflex___state____state__state____global_state__pages___suppliers____supplier_state: createContext(null),reflex___state____state__state____global_state__pages___users____user_state: createContext(null),};
export const EventLoopContext = createContext(null);
export const clientStorage = {"cookies": {}, "local_storage": {}, "session_storage": {}}


export const state_name = "reflex___state____state"

export const exception_state_name = "reflex___state____state.reflex___state____frontend_event_exception_state"

// These events are triggered on initial load and each page navigation.
export const onLoadInternalEvent = () => {
    const internal_events = [];

    // Get tracked cookie and local storage vars to send to the backend.
    const client_storage_vars = hydrateClientStorage(clientStorage);
    // But only send the vars if any are actually set in the browser.
    if (client_storage_vars && Object.keys(client_storage_vars).length !== 0) {
        internal_events.push(
            ReflexEvent(
                'reflex___state____state.reflex___state____update_vars_internal_state.update_vars_internal',
                {vars: client_storage_vars},
            ),
        );
    }

    // `on_load_internal` triggers the correct on_load event(s) for the current page.
    // If the page does not define any on_load event, this will just set `is_hydrated = true`.
    internal_events.push(ReflexEvent('reflex___state____state.reflex___state____on_load_internal_state.on_load_internal'));

    return internal_events;
}

// The following events are sent when the websocket connects or reconnects.
export const initialEvents = () => [
    ReflexEvent('reflex___state____state.hydrate'),
    ...onLoadInternalEvent()
]
    

export const isDevMode = true;

export function UploadFilesProvider({ children }) {
  const [filesById, setFilesById] = useState({})
  refs["__clear_selected_files"] = (id) => setFilesById(filesById => {
    const newFilesById = {...filesById}
    delete newFilesById[id]
    return newFilesById
  })
  return createElement(
    UploadFilesContext.Provider,
    { value: [filesById, setFilesById] },
    children
  );
}

export function ClientSide(component) {
  return ({ children, ...props }) => {
    const [Component, setComponent] = useState(null);
    useEffect(() => {
      setComponent(component);
    }, []);
    return Component ? jsx(Component, props, children) : null;
  };
}

export function EventLoopProvider({ children }) {
  const dispatch = useContext(DispatchContext)
  const [addEvents, connectErrors] = useEventLoop(
    dispatch,
    initialEvents,
    clientStorage,
  )
  return createElement(
    EventLoopContext.Provider,
    { value: [addEvents, connectErrors] },
    children
  );
}

export function StateProvider({ children }) {
  const [reflex___state____state, dispatch_reflex___state____state] = useReducer(applyDelta, initialState["reflex___state____state"])
const [reflex___state____state__reflex___state____frontend_event_exception_state, dispatch_reflex___state____state__reflex___state____frontend_event_exception_state] = useReducer(applyDelta, initialState["reflex___state____state.reflex___state____frontend_event_exception_state"])
const [reflex___state____state__reflex___state____on_load_internal_state, dispatch_reflex___state____state__reflex___state____on_load_internal_state] = useReducer(applyDelta, initialState["reflex___state____state.reflex___state____on_load_internal_state"])
const [reflex___state____state__reflex___state____update_vars_internal_state, dispatch_reflex___state____state__reflex___state____update_vars_internal_state] = useReducer(applyDelta, initialState["reflex___state____state.reflex___state____update_vars_internal_state"])
const [reflex___state____state__state____global_state, dispatch_reflex___state____state__state____global_state] = useReducer(applyDelta, initialState["reflex___state____state.state____global_state"])
const [reflex___state____state__state____global_state__pages___auth____auth_state, dispatch_reflex___state____state__state____global_state__pages___auth____auth_state] = useReducer(applyDelta, initialState["reflex___state____state.state____global_state.pages___auth____auth_state"])
const [reflex___state____state__state____global_state__pages___customers____customer_state, dispatch_reflex___state____state__state____global_state__pages___customers____customer_state] = useReducer(applyDelta, initialState["reflex___state____state.state____global_state.pages___customers____customer_state"])
const [reflex___state____state__state____global_state__pages___dashboard____dashboard_state, dispatch_reflex___state____state__state____global_state__pages___dashboard____dashboard_state] = useReducer(applyDelta, initialState["reflex___state____state.state____global_state.pages___dashboard____dashboard_state"])
const [reflex___state____state__state____global_state__pages___outstanding____outstanding_state, dispatch_reflex___state____state__state____global_state__pages___outstanding____outstanding_state] = useReducer(applyDelta, initialState["reflex___state____state.state____global_state.pages___outstanding____outstanding_state"])
const [reflex___state____state__state____global_state__pages___products____product_state, dispatch_reflex___state____state__state____global_state__pages___products____product_state] = useReducer(applyDelta, initialState["reflex___state____state.state____global_state.pages___products____product_state"])
const [reflex___state____state__state____global_state__pages___purchases____purchase_state, dispatch_reflex___state____state__state____global_state__pages___purchases____purchase_state] = useReducer(applyDelta, initialState["reflex___state____state.state____global_state.pages___purchases____purchase_state"])
const [reflex___state____state__state____global_state__pages___reports____report_state, dispatch_reflex___state____state__state____global_state__pages___reports____report_state] = useReducer(applyDelta, initialState["reflex___state____state.state____global_state.pages___reports____report_state"])
const [reflex___state____state__state____global_state__pages___sales____sales_state, dispatch_reflex___state____state__state____global_state__pages___sales____sales_state] = useReducer(applyDelta, initialState["reflex___state____state.state____global_state.pages___sales____sales_state"])
const [reflex___state____state__state____global_state__pages___settings____settings_state, dispatch_reflex___state____state__state____global_state__pages___settings____settings_state] = useReducer(applyDelta, initialState["reflex___state____state.state____global_state.pages___settings____settings_state"])
const [reflex___state____state__state____global_state__pages___stocks____stock_state, dispatch_reflex___state____state__state____global_state__pages___stocks____stock_state] = useReducer(applyDelta, initialState["reflex___state____state.state____global_state.pages___stocks____stock_state"])
const [reflex___state____state__state____global_state__pages___suppliers____supplier_state, dispatch_reflex___state____state__state____global_state__pages___suppliers____supplier_state] = useReducer(applyDelta, initialState["reflex___state____state.state____global_state.pages___suppliers____supplier_state"])
const [reflex___state____state__state____global_state__pages___users____user_state, dispatch_reflex___state____state__state____global_state__pages___users____user_state] = useReducer(applyDelta, initialState["reflex___state____state.state____global_state.pages___users____user_state"])
  const dispatchers = useMemo(() => {
    return {
      "reflex___state____state": dispatch_reflex___state____state,
"reflex___state____state.reflex___state____frontend_event_exception_state": dispatch_reflex___state____state__reflex___state____frontend_event_exception_state,
"reflex___state____state.reflex___state____on_load_internal_state": dispatch_reflex___state____state__reflex___state____on_load_internal_state,
"reflex___state____state.reflex___state____update_vars_internal_state": dispatch_reflex___state____state__reflex___state____update_vars_internal_state,
"reflex___state____state.state____global_state": dispatch_reflex___state____state__state____global_state,
"reflex___state____state.state____global_state.pages___auth____auth_state": dispatch_reflex___state____state__state____global_state__pages___auth____auth_state,
"reflex___state____state.state____global_state.pages___customers____customer_state": dispatch_reflex___state____state__state____global_state__pages___customers____customer_state,
"reflex___state____state.state____global_state.pages___dashboard____dashboard_state": dispatch_reflex___state____state__state____global_state__pages___dashboard____dashboard_state,
"reflex___state____state.state____global_state.pages___outstanding____outstanding_state": dispatch_reflex___state____state__state____global_state__pages___outstanding____outstanding_state,
"reflex___state____state.state____global_state.pages___products____product_state": dispatch_reflex___state____state__state____global_state__pages___products____product_state,
"reflex___state____state.state____global_state.pages___purchases____purchase_state": dispatch_reflex___state____state__state____global_state__pages___purchases____purchase_state,
"reflex___state____state.state____global_state.pages___reports____report_state": dispatch_reflex___state____state__state____global_state__pages___reports____report_state,
"reflex___state____state.state____global_state.pages___sales____sales_state": dispatch_reflex___state____state__state____global_state__pages___sales____sales_state,
"reflex___state____state.state____global_state.pages___settings____settings_state": dispatch_reflex___state____state__state____global_state__pages___settings____settings_state,
"reflex___state____state.state____global_state.pages___stocks____stock_state": dispatch_reflex___state____state__state____global_state__pages___stocks____stock_state,
"reflex___state____state.state____global_state.pages___suppliers____supplier_state": dispatch_reflex___state____state__state____global_state__pages___suppliers____supplier_state,
"reflex___state____state.state____global_state.pages___users____user_state": dispatch_reflex___state____state__state____global_state__pages___users____user_state,
    }
  }, [])

  return (
    createElement(StateContexts.reflex___state____state,{value: reflex___state____state},
createElement(StateContexts.reflex___state____state__reflex___state____frontend_event_exception_state,{value: reflex___state____state__reflex___state____frontend_event_exception_state},
createElement(StateContexts.reflex___state____state__reflex___state____on_load_internal_state,{value: reflex___state____state__reflex___state____on_load_internal_state},
createElement(StateContexts.reflex___state____state__reflex___state____update_vars_internal_state,{value: reflex___state____state__reflex___state____update_vars_internal_state},
createElement(StateContexts.reflex___state____state__state____global_state,{value: reflex___state____state__state____global_state},
createElement(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state,{value: reflex___state____state__state____global_state__pages___auth____auth_state},
createElement(StateContexts.reflex___state____state__state____global_state__pages___customers____customer_state,{value: reflex___state____state__state____global_state__pages___customers____customer_state},
createElement(StateContexts.reflex___state____state__state____global_state__pages___dashboard____dashboard_state,{value: reflex___state____state__state____global_state__pages___dashboard____dashboard_state},
createElement(StateContexts.reflex___state____state__state____global_state__pages___outstanding____outstanding_state,{value: reflex___state____state__state____global_state__pages___outstanding____outstanding_state},
createElement(StateContexts.reflex___state____state__state____global_state__pages___products____product_state,{value: reflex___state____state__state____global_state__pages___products____product_state},
createElement(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state,{value: reflex___state____state__state____global_state__pages___purchases____purchase_state},
createElement(StateContexts.reflex___state____state__state____global_state__pages___reports____report_state,{value: reflex___state____state__state____global_state__pages___reports____report_state},
createElement(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state,{value: reflex___state____state__state____global_state__pages___sales____sales_state},
createElement(StateContexts.reflex___state____state__state____global_state__pages___settings____settings_state,{value: reflex___state____state__state____global_state__pages___settings____settings_state},
createElement(StateContexts.reflex___state____state__state____global_state__pages___stocks____stock_state,{value: reflex___state____state__state____global_state__pages___stocks____stock_state},
createElement(StateContexts.reflex___state____state__state____global_state__pages___suppliers____supplier_state,{value: reflex___state____state__state____global_state__pages___suppliers____supplier_state},
createElement(StateContexts.reflex___state____state__state____global_state__pages___users____user_state,{value: reflex___state____state__state____global_state__pages___users____user_state},
    createElement(DispatchContext, {value: dispatchers}, children)
    )))))))))))))))))
  )
}