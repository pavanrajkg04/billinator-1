import {Fragment,useCallback,useContext,useEffect} from "react"
import {Box as RadixThemesBox,Button as RadixThemesButton,Callout as RadixThemesCallout,Flex as RadixThemesFlex,Heading as RadixThemesHeading,Link as RadixThemesLink,Select as RadixThemesSelect,Separator as RadixThemesSeparator,Spinner as RadixThemesSpinner,Table as RadixThemesTable,Text as RadixThemesText,TextArea as RadixThemesTextArea,TextField as RadixThemesTextField} from "@radix-ui/themes"
import {Link as ReactRouterLink} from "react-router"
import {BarChart as LucideBarChart,Check as LucideCheck,DollarSign as LucideDollarSign,Home as LucideHome,Package as LucidePackage,Receipt as LucideReceipt,Settings as LucideSettings,ShoppingCart as LucideShoppingCart,TriangleAlert as LucideTriangleAlert,Truck as LucideTruck,UserCog as LucideUserCog,Users as LucideUsers,Warehouse as LucideWarehouse} from "lucide-react"
import {EventLoopContext,StateContexts} from "$/utils/context"
import {ReflexEvent,isNotNullOrUndefined,isTrue} from "$/utils/state"
import DebounceInput from "react-debounce-input"
import {jsx} from "@emotion/react"




function Button_f9a95096f72fa265a478f240d484b61a () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_146556d533860445ae3547817fdd72f2 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___products____product_state.refresh_products", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{css:({ ["icon"] : "refresh-cw" }),onClick:on_click_146556d533860445ae3547817fdd72f2,variant:"outline"},"Refresh")
  )
}


function Button_4af67cf143901010610ff479b3a29178 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_5f714a6a2fc787cbbba5f9b1ef4d3ad2 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___products____product_state.open_create_form", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"blue",css:({ ["icon"] : "plus" }),onClick:on_click_5f714a6a2fc787cbbba5f9b1ef4d3ad2},"Add Product")
  )
}


function Callout__text_ccd729024d4405157d4766f147a6d826 () {
  const reflex___state____state__state____global_state__pages___products____product_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___products____product_state)



  return (
    jsx(RadixThemesCallout.Text,{},reflex___state____state__state____global_state__pages___products____product_state.error_message_rx_state_)
  )
}


function Fragment_ae11232d951eb69e6dd8fa339d0cfbab () {
  const reflex___state____state__state____global_state__pages___products____product_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___products____product_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___products____product_state.error_message_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesCallout.Root,{color:"red",css:({ ["icon"] : "triangle_alert", ["width"] : "100%" })},jsx(RadixThemesCallout.Icon,{},jsx(LucideTriangleAlert,{},)),jsx(Callout__text_ccd729024d4405157d4766f147a6d826,{},)))):(jsx(Fragment,{},))))
  )
}


function Callout__text_701b07d6573350d94e1429c2b39577e8 () {
  const reflex___state____state__state____global_state__pages___products____product_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___products____product_state)



  return (
    jsx(RadixThemesCallout.Text,{},reflex___state____state__state____global_state__pages___products____product_state.success_message_rx_state_)
  )
}


function Fragment_afb5df0c3abe0757448d56556b5fe731 () {
  const reflex___state____state__state____global_state__pages___products____product_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___products____product_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___products____product_state.success_message_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesCallout.Root,{color:"green",css:({ ["icon"] : "check", ["width"] : "100%" })},jsx(RadixThemesCallout.Icon,{},jsx(LucideCheck,{},)),jsx(Callout__text_701b07d6573350d94e1429c2b39577e8,{},)))):(jsx(Fragment,{},))))
  )
}


function Heading_3d286cc29cde83c8be5aa6c8e4d1e87c () {
  const reflex___state____state__state____global_state__pages___products____product_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___products____product_state)



  return (
    jsx(RadixThemesHeading,{size:"6"},((reflex___state____state__state____global_state__pages___products____product_state.editing_id_rx_state_ > 0) ? "Edit Product" : "Add New Product"))
  )
}


function Debounceinput_94197479464f1d274981d0e7ad1d4675 () {
  const reflex___state____state__state____global_state__pages___products____product_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___products____product_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_d81970655832057240d9e9c44ad2b61c = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___products____product_state.set_form_sku", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_d81970655832057240d9e9c44ad2b61c,placeholder:"SKU *",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___products____product_state.form_sku_rx_state_) ? reflex___state____state__state____global_state__pages___products____product_state.form_sku_rx_state_ : "")},)
  )
}


function Debounceinput_a69835f94caea738c2403ab42d9678b6 () {
  const reflex___state____state__state____global_state__pages___products____product_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___products____product_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_79faba14ef5e76b16b7ad5808288f22b = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___products____product_state.set_form_name", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_79faba14ef5e76b16b7ad5808288f22b,placeholder:"Product Name *",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___products____product_state.form_name_rx_state_) ? reflex___state____state__state____global_state__pages___products____product_state.form_name_rx_state_ : "")},)
  )
}


function Debounceinput_b5909b76a557f594498ff58d2b623610 () {
  const reflex___state____state__state____global_state__pages___products____product_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___products____product_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_b7d9079a83fd9567a1b65168de854021 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___products____product_state.set_form_description", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextArea,onChange:on_change_b7d9079a83fd9567a1b65168de854021,placeholder:"Description",value:reflex___state____state__state____global_state__pages___products____product_state.form_description_rx_state_},)
  )
}


function Debounceinput_ac209a8900932662ab167164dc542559 () {
  const reflex___state____state__state____global_state__pages___products____product_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___products____product_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_3aa9004b187a4e56b29823d074464391 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___products____product_state.set_form_hsn_code", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_3aa9004b187a4e56b29823d074464391,placeholder:"HSN Code",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___products____product_state.form_hsn_code_rx_state_) ? reflex___state____state__state____global_state__pages___products____product_state.form_hsn_code_rx_state_ : "")},)
  )
}


function Select__root_f144d4bf495e4c82fb3220e3d9dd7989 () {
  const reflex___state____state__state____global_state__pages___products____product_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___products____product_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_7cf36d6527771ae22efb01b95dd32ed5 = useCallback(((_ev_0) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___products____product_state.set_form_unit", ({ ["value"] : _ev_0 }), ({  })))], [_ev_0], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesSelect.Root,{onValueChange:on_change_7cf36d6527771ae22efb01b95dd32ed5,value:reflex___state____state__state____global_state__pages___products____product_state.form_unit_rx_state_},jsx(RadixThemesSelect.Trigger,{css:({ ["width"] : "100%" })},),jsx(RadixThemesSelect.Content,{},jsx(RadixThemesSelect.Group,{},"",jsx(RadixThemesSelect.Item,{value:"PCS"},"PCS"),jsx(RadixThemesSelect.Item,{value:"KG"},"KG"),jsx(RadixThemesSelect.Item,{value:"LTR"},"LTR"),jsx(RadixThemesSelect.Item,{value:"MTR"},"MTR"),jsx(RadixThemesSelect.Item,{value:"BOX"},"BOX"),jsx(RadixThemesSelect.Item,{value:"PKT"},"PKT"))))
  )
}


function Debounceinput_4754fac4cd2eec7f40e383318ce570c9 () {
  const reflex___state____state__state____global_state__pages___products____product_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___products____product_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_5ec9bb3fc13b77a786cd069bd3d942cf = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___products____product_state.set_form_purchase_price", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_5ec9bb3fc13b77a786cd069bd3d942cf,placeholder:"Purchase Price",type:"number",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___products____product_state.form_purchase_price_rx_state_) ? reflex___state____state__state____global_state__pages___products____product_state.form_purchase_price_rx_state_ : "")},)
  )
}


function Debounceinput_5308b8c2bb1a59f7c9b0445b6862988f () {
  const reflex___state____state__state____global_state__pages___products____product_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___products____product_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_dfe9e75cc2c756ede7559f3cdbbdc679 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___products____product_state.set_form_sale_price", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_dfe9e75cc2c756ede7559f3cdbbdc679,placeholder:"Sale Price *",type:"number",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___products____product_state.form_sale_price_rx_state_) ? reflex___state____state__state____global_state__pages___products____product_state.form_sale_price_rx_state_ : "")},)
  )
}


function Debounceinput_ed7dbadb96af1efac437f130e33b1156 () {
  const reflex___state____state__state____global_state__pages___products____product_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___products____product_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_fb8a2450b7eb1e10bf4f18320489993b = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___products____product_state.set_form_tax_rate", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_fb8a2450b7eb1e10bf4f18320489993b,placeholder:"Tax Rate (%)",type:"number",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___products____product_state.form_tax_rate_rx_state_) ? reflex___state____state__state____global_state__pages___products____product_state.form_tax_rate_rx_state_ : "")},)
  )
}


function Debounceinput_f51a51586b52e9f3adef8e60edf6b52c () {
  const reflex___state____state__state____global_state__pages___products____product_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___products____product_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_e9d7ee474044c1d5e444d8e81cf83a11 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___products____product_state.set_form_current_stock", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_e9d7ee474044c1d5e444d8e81cf83a11,placeholder:"Initial Stock",step:"0.001",type:"number",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___products____product_state.form_current_stock_rx_state_) ? reflex___state____state__state____global_state__pages___products____product_state.form_current_stock_rx_state_ : "")},)
  )
}


function Debounceinput_a09ff1d2da7458cffcd13a249af1ce5b () {
  const reflex___state____state__state____global_state__pages___products____product_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___products____product_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_92fcb56c8ae73777bcf23bae989ea6d6 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___products____product_state.set_form_reorder_level", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_92fcb56c8ae73777bcf23bae989ea6d6,placeholder:"Reorder Level",step:"0.001",type:"number",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___products____product_state.form_reorder_level_rx_state_) ? reflex___state____state__state____global_state__pages___products____product_state.form_reorder_level_rx_state_ : "")},)
  )
}


function Button_f73270372426d6c2e8dedf1a73320a8b () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_6f34d60ccdf53e6a27dcc65a56d18a6b = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___products____product_state.set_show_form", ({ ["value"] : false }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{onClick:on_click_6f34d60ccdf53e6a27dcc65a56d18a6b,variant:"outline"},"Cancel")
  )
}


function Button_8c7d96f74d1fa040ced841039e926724 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_7961e742e38bb618f915af4a5a2b146b = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___products____product_state.save_product", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"blue",onClick:on_click_7961e742e38bb618f915af4a5a2b146b},"Save")
  )
}


function Fragment_e562566f7cf9d7158ccb4889fb4e39bd () {
  const reflex___state____state__state____global_state__pages___products____product_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___products____product_state)



  return (
    jsx(Fragment,{},(reflex___state____state__state____global_state__pages___products____product_state.show_form_rx_state_?(jsx(Fragment,{},jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["border"] : "1px solid", ["borderColor"] : "gray.300", ["borderRadius"] : "lg", ["background"] : "white", ["width"] : "100%", ["marginBottom"] : "4" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(Heading_3d286cc29cde83c8be5aa6c8e4d1e87c,{},),jsx(Debounceinput_94197479464f1d274981d0e7ad1d4675,{},),jsx(Debounceinput_a69835f94caea738c2403ab42d9678b6,{},),jsx(Debounceinput_b5909b76a557f594498ff58d2b623610,{},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(Debounceinput_ac209a8900932662ab167164dc542559,{},),jsx(Select__root_f144d4bf495e4c82fb3220e3d9dd7989,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(Debounceinput_4754fac4cd2eec7f40e383318ce570c9,{},),jsx(Debounceinput_5308b8c2bb1a59f7c9b0445b6862988f,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(Debounceinput_ed7dbadb96af1efac437f130e33b1156,{},),jsx(Debounceinput_f51a51586b52e9f3adef8e60edf6b52c,{},)),jsx(Debounceinput_a09ff1d2da7458cffcd13a249af1ce5b,{},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(Button_f73270372426d6c2e8dedf1a73320a8b,{},),jsx(Button_8c7d96f74d1fa040ced841039e926724,{},)))))):(jsx(Fragment,{},))))
  )
}


function Table__body_84b75592edef2ae05eda00f376c4ac00 () {
  const reflex___state____state__state____global_state__pages___products____product_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___products____product_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);



  return (
    jsx(RadixThemesTable.Body,{},Array.prototype.map.call(reflex___state____state__state____global_state__pages___products____product_state.product_indices_rx_state_ ?? [],((idx_rx_state_,index_a3609fa5aa4220e1f404b95a29694df5)=>(jsx(RadixThemesTable.Row,{key:index_a3609fa5aa4220e1f404b95a29694df5},jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___products____product_state.product_skus_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___products____product_state.product_names_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___products____product_state.product_hsn_codes_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___products____product_state.product_units_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},("\u20b9 "+(reflex___state____state__state____global_state__pages___products____product_state.product_sale_prices_rx_state_?.at?.(idx_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ",")))),jsx(RadixThemesTable.Cell,{},((reflex___state____state__state____global_state__pages___products____product_state.product_tax_rates_rx_state_?.at?.(idx_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ""))+"%")),jsx(RadixThemesTable.Cell,{},jsx(Fragment,{},((reflex___state____state__state____global_state__pages___products____product_state.product_stocks_rx_state_?.at?.(idx_rx_state_) <= reflex___state____state__state____global_state__pages___products____product_state.product_reorder_levels_rx_state_?.at?.(idx_rx_state_))?(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "red.600" }),weight:"bold"},(reflex___state____state__state____global_state__pages___products____product_state.product_stocks_rx_state_?.at?.(idx_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ""))))):(jsx(Fragment,{},jsx(RadixThemesText,{as:"p"},(reflex___state____state__state____global_state__pages___products____product_state.product_stocks_rx_state_?.at?.(idx_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', "")))))))),jsx(RadixThemesTable.Cell,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"2"},jsx(RadixThemesButton,{color:"blue",onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___products____product_state.set_selected_product_id", ({ ["product_id"] : reflex___state____state__state____global_state__pages___products____product_state.product_ids_rx_state_?.at?.(idx_rx_state_) }), ({  }))), (ReflexEvent("reflex___state____state.state____global_state.pages___products____product_state.open_edit_form", ({ ["product_id"] : ({ ["button"] : _e?.["button"], ["buttons"] : _e?.["buttons"], ["client_x"] : _e?.["clientX"], ["client_y"] : _e?.["clientY"], ["alt_key"] : _e?.["altKey"], ["ctrl_key"] : _e?.["ctrlKey"], ["meta_key"] : _e?.["metaKey"], ["shift_key"] : _e?.["shiftKey"] }) }), ({  })))], [_e], ({  })))),size:"1",variant:"outline"},"Modify"),jsx(Fragment,{},(reflex___state____state__state____global_state__pages___products____product_state.product_is_used_rx_state_?.at?.(idx_rx_state_)?(jsx(Fragment,{},jsx(RadixThemesButton,{color:"red",css:({ ["opacity"] : "0.5" }),disabled:true,size:"1",variant:"outline"},"Delete"))):(jsx(Fragment,{},jsx(RadixThemesButton,{color:"red",onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___products____product_state.set_selected_product_id", ({ ["product_id"] : reflex___state____state__state____global_state__pages___products____product_state.product_ids_rx_state_?.at?.(idx_rx_state_) }), ({  }))), (ReflexEvent("reflex___state____state.state____global_state.pages___products____product_state.delete_product", ({ ["product_id"] : ({ ["button"] : _e?.["button"], ["buttons"] : _e?.["buttons"], ["client_x"] : _e?.["clientX"], ["client_y"] : _e?.["clientY"], ["alt_key"] : _e?.["altKey"], ["ctrl_key"] : _e?.["ctrlKey"], ["meta_key"] : _e?.["metaKey"], ["shift_key"] : _e?.["shiftKey"] }) }), ({  })))], [_e], ({  })))),size:"1",variant:"outline"},"Delete"))))))))))))
  )
}


function Fragment_dd8fc7dd079d6432fdc0b94c136b6067 () {
  const reflex___state____state__state____global_state__pages___products____product_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___products____product_state)



  return (
    jsx(Fragment,{},((reflex___state____state__state____global_state__pages___products____product_state.product_indices_rx_state_.length > 0)?(jsx(Fragment,{},jsx(RadixThemesTable.Root,{css:({ ["width"] : "100%" })},jsx(RadixThemesTable.Header,{},jsx(RadixThemesTable.Row,{},jsx(RadixThemesTable.ColumnHeaderCell,{},"SKU"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Name"),jsx(RadixThemesTable.ColumnHeaderCell,{},"HSN"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Unit"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Sale Price"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Tax %"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Stock"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Actions"))),jsx(Table__body_84b75592edef2ae05eda00f376c4ac00,{},)))):(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.500", ["padding"] : "4" })},"No products found. Click 'Add Product' to create one.")))))
  )
}


function Fragment_d877af745fb4e8d07aa8d2a83c3a4287 () {
  const reflex___state____state__state____global_state__pages___products____product_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___products____product_state)



  return (
    jsx(Fragment,{},(reflex___state____state__state____global_state__pages___products____product_state.is_loading_rx_state_?(jsx(Fragment,{},jsx(RadixThemesFlex,{css:({ ["display"] : "flex", ["alignItems"] : "center", ["justifyContent"] : "center", ["padding"] : "8" })},jsx(RadixThemesSpinner,{},)))):(jsx(Fragment_dd8fc7dd079d6432fdc0b94c136b6067,{},))))
  )
}


export default function Component() {





  return (
    jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100vh" }),direction:"row",gap:"0"},jsx(RadixThemesBox,{css:({ ["width"] : "250px", ["height"] : "100vh", ["padding"] : "4", ["background"] : "gray.50", ["borderRight"] : "1px solid", ["borderColor"] : "gray.200" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesHeading,{css:({ ["padding"] : "4" }),size:"6"},"Billinator"),jsx(RadixThemesSeparator,{size:"4"},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["padding"] : "2" }),direction:"column",gap:"2"},jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/dashboard"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideHome,{size:20},),jsx(RadixThemesText,{as:"p"},"Dashboard")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/products"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucidePackage,{size:20},),jsx(RadixThemesText,{as:"p"},"Products")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/customers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUsers,{size:20},),jsx(RadixThemesText,{as:"p"},"Customers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/suppliers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideTruck,{size:20},),jsx(RadixThemesText,{as:"p"},"Suppliers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/purchases"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideShoppingCart,{size:20},),jsx(RadixThemesText,{as:"p"},"Purchases")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/sales"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideReceipt,{size:20},),jsx(RadixThemesText,{as:"p"},"Sales")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/stocks"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideWarehouse,{size:20},),jsx(RadixThemesText,{as:"p"},"Stocks")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/outstanding"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideDollarSign,{size:20},),jsx(RadixThemesText,{as:"p"},"Outstanding")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/reports"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideBarChart,{size:20},),jsx(RadixThemesText,{as:"p"},"Reports")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/users"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUserCog,{size:20},),jsx(RadixThemesText,{as:"p"},"Users & Roles")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/settings"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideSettings,{size:20},),jsx(RadixThemesText,{as:"p"},"Settings"))))))),jsx(RadixThemesBox,{css:({ ["flex"] : "1", ["padding"] : "6", ["overflowY"] : "auto", ["height"] : "100vh" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%", ["marginBottom"] : "4" }),direction:"row",gap:"3"},jsx(RadixThemesHeading,{size:"9",weight:"bold"},"Products"),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"3"},jsx(Button_f9a95096f72fa265a478f240d484b61a,{},),jsx(Button_4af67cf143901010610ff479b3a29178,{},))),jsx(Fragment_ae11232d951eb69e6dd8fa339d0cfbab,{},),jsx(Fragment_afb5df0c3abe0757448d56556b5fe731,{},),jsx(Fragment_e562566f7cf9d7158ccb4889fb4e39bd,{},),jsx(Fragment_d877af745fb4e8d07aa8d2a83c3a4287,{},)))),jsx("title",{},"Products - Billinator"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}