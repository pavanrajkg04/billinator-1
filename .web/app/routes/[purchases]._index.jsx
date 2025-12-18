import {Fragment,useCallback,useContext,useEffect} from "react"
import {Badge as RadixThemesBadge,Box as RadixThemesBox,Button as RadixThemesButton,Callout as RadixThemesCallout,Flex as RadixThemesFlex,Heading as RadixThemesHeading,Link as RadixThemesLink,Select as RadixThemesSelect,Separator as RadixThemesSeparator,Spinner as RadixThemesSpinner,Table as RadixThemesTable,Text as RadixThemesText,TextArea as RadixThemesTextArea,TextField as RadixThemesTextField} from "@radix-ui/themes"
import {Link as ReactRouterLink} from "react-router"
import {BarChart as LucideBarChart,Check as LucideCheck,DollarSign as LucideDollarSign,Home as LucideHome,Package as LucidePackage,Receipt as LucideReceipt,Settings as LucideSettings,ShoppingCart as LucideShoppingCart,TriangleAlert as LucideTriangleAlert,Truck as LucideTruck,UserCog as LucideUserCog,Users as LucideUsers,Warehouse as LucideWarehouse,X as LucideX} from "lucide-react"
import {EventLoopContext,StateContexts} from "$/utils/context"
import {ReflexEvent,isNotNullOrUndefined,isTrue} from "$/utils/state"
import DebounceInput from "react-debounce-input"
import {jsx} from "@emotion/react"




function Button_b4ed0357e078c989e3450a56becc97a2 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_efffbcc668b7e39d9225d9690a2baf4c = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.refresh_purchases", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{css:({ ["icon"] : "refresh-cw" }),onClick:on_click_efffbcc668b7e39d9225d9690a2baf4c,variant:"outline"},"Refresh")
  )
}


function Button_2272ce24b42fcb33b76be67565ce867a () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_6177d0d20fc93b1bd35a620035a6541d = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.open_create_form", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"blue",css:({ ["icon"] : "plus" }),onClick:on_click_6177d0d20fc93b1bd35a620035a6541d},"New Purchase Invoice")
  )
}


function Callout__text_25cd8e1dbdaebe3974a343fb1e1b5ed1 () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(RadixThemesCallout.Text,{},reflex___state____state__state____global_state__pages___purchases____purchase_state.error_message_rx_state_)
  )
}


function Fragment_d2dd7c0e0018fd9d514146aecc443c02 () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___purchases____purchase_state.error_message_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesCallout.Root,{color:"red",css:({ ["icon"] : "triangle_alert", ["width"] : "100%" })},jsx(RadixThemesCallout.Icon,{},jsx(LucideTriangleAlert,{},)),jsx(Callout__text_25cd8e1dbdaebe3974a343fb1e1b5ed1,{},)))):(jsx(Fragment,{},))))
  )
}


function Callout__text_53262d9e2cb8b73b257c14e0f63df1cd () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(RadixThemesCallout.Text,{},reflex___state____state__state____global_state__pages___purchases____purchase_state.success_message_rx_state_)
  )
}


function Fragment_5221c829c11ec1d8e9cbb886b5dd6eea () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___purchases____purchase_state.success_message_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesCallout.Root,{color:"green",css:({ ["icon"] : "check", ["width"] : "100%" })},jsx(RadixThemesCallout.Icon,{},jsx(LucideCheck,{},)),jsx(Callout__text_53262d9e2cb8b73b257c14e0f63df1cd,{},)))):(jsx(Fragment,{},))))
  )
}


function Select__group_31c1f33c224652384b8c82db48c16248 () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(RadixThemesSelect.Group,{},"",Array.prototype.map.call(reflex___state____state__state____global_state__pages___purchases____purchase_state.supplier_options_rx_state_ ?? [],((item_rx_state_,index_a4c056de887ac0859af139cad1744de9)=>(jsx(RadixThemesSelect.Item,{key:index_a4c056de887ac0859af139cad1744de9,value:item_rx_state_},item_rx_state_)))))
  )
}


function Select__root_2b7ce3c43a87425321e8d788cbdd1335 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_7bb20e6eeb21f178ef352683df2cf1e3 = useCallback(((_ev_0) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.set_form_supplier_id", ({ ["value"] : _ev_0 }), ({  })))], [_ev_0], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesSelect.Root,{onValueChange:on_change_7bb20e6eeb21f178ef352683df2cf1e3},jsx(RadixThemesSelect.Trigger,{css:({ ["width"] : "100%" }),placeholder:"Select Supplier *"},),jsx(RadixThemesSelect.Content,{},jsx(Select__group_31c1f33c224652384b8c82db48c16248,{},)))
  )
}


function Debounceinput_2675f6b963c3e3c6693494c16db7e1f9 () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_8a4a1dcb3cfd7705ac0a839cfe8b4214 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.set_form_invoice_date", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_8a4a1dcb3cfd7705ac0a839cfe8b4214,placeholder:"Invoice Date",type:"date",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___purchases____purchase_state.form_invoice_date_rx_state_) ? reflex___state____state__state____global_state__pages___purchases____purchase_state.form_invoice_date_rx_state_ : "")},)
  )
}


function Debounceinput_6d6ac121b3b4fd0ebc7c467679f19c72 () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_cf51ce6888e1257ed4280714c3f39ff9 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.set_form_due_date", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_cf51ce6888e1257ed4280714c3f39ff9,placeholder:"Due Date (optional)",type:"date",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___purchases____purchase_state.form_due_date_rx_state_) ? reflex___state____state__state____global_state__pages___purchases____purchase_state.form_due_date_rx_state_ : "")},)
  )
}


function Debounceinput_08dd5ee5bd71106c2119c94640723c3e () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_e74f3121f46dd3ef24fff44409ee49a6 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.set_form_notes", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextArea,onChange:on_change_e74f3121f46dd3ef24fff44409ee49a6,placeholder:"Notes (optional)",value:reflex___state____state__state____global_state__pages___purchases____purchase_state.form_notes_rx_state_},)
  )
}


function Select__group_bbfdf09200608d92587eb2f024992806 () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(RadixThemesSelect.Group,{},"",Array.prototype.map.call(reflex___state____state__state____global_state__pages___purchases____purchase_state.product_options_rx_state_ ?? [],((item_rx_state_,index_a4c056de887ac0859af139cad1744de9)=>(jsx(RadixThemesSelect.Item,{key:index_a4c056de887ac0859af139cad1744de9,value:item_rx_state_},item_rx_state_)))))
  )
}


function Select__root_721b8b562b52d9e89bb6b5e019e7e44f () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_a35fb40ae6635fb19ac911fd7b5f63c2 = useCallback(((_ev_0) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.set_current_item_product_id", ({ ["value"] : _ev_0 }), ({  })))], [_ev_0], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesSelect.Root,{onValueChange:on_change_a35fb40ae6635fb19ac911fd7b5f63c2},jsx(RadixThemesSelect.Trigger,{css:({ ["width"] : "40%" }),placeholder:"Select Product *"},),jsx(RadixThemesSelect.Content,{},jsx(Select__group_bbfdf09200608d92587eb2f024992806,{},)))
  )
}


function Debounceinput_09a3f250a5cf547af975ebddcc7c15c3 () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_ab8ae7498b72514243e49222bfd4b75b = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.set_current_item_quantity", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "15%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_ab8ae7498b72514243e49222bfd4b75b,placeholder:"Quantity *",step:"0.001",type:"number",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___purchases____purchase_state.current_item_quantity_rx_state_) ? reflex___state____state__state____global_state__pages___purchases____purchase_state.current_item_quantity_rx_state_ : "")},)
  )
}


function Debounceinput_7c9278863b66b60d07dcb8114bacde09 () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_08192b84673b89865b33a4a6b2e82dcf = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.set_current_item_unit_price", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "15%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_08192b84673b89865b33a4a6b2e82dcf,placeholder:"Unit Price *",step:"0.01",type:"number",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___purchases____purchase_state.current_item_unit_price_rx_state_) ? reflex___state____state__state____global_state__pages___purchases____purchase_state.current_item_unit_price_rx_state_ : "")},)
  )
}


function Debounceinput_95ddf19be7683c8fc959b0860a50edff () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_5eb5c6fc199b727ad992ace4246e1a9a = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.set_current_item_tax_rate", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "15%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_5eb5c6fc199b727ad992ace4246e1a9a,placeholder:"Tax Rate %",step:"0.01",type:"number",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___purchases____purchase_state.current_item_tax_rate_rx_state_) ? reflex___state____state__state____global_state__pages___purchases____purchase_state.current_item_tax_rate_rx_state_ : "")},)
  )
}


function Button_cf45bd92d141dc2ad9a35a364f4424b9 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_eb80e29b063f3556901b578b5530992c = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.add_invoice_item", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"green",css:({ ["icon"] : "plus", ["width"] : "15%" }),onClick:on_click_eb80e29b063f3556901b578b5530992c},"Add Item")
  )
}


function Table__body_44f82bce0fed7015f268983c7ffdc835 () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);



  return (
    jsx(RadixThemesTable.Body,{},Array.prototype.map.call(reflex___state____state__state____global_state__pages___purchases____purchase_state.item_indices_rx_state_ ?? [],((idx_rx_state_,index_620cf0a5e508688febdda5c962d22769)=>(jsx(RadixThemesTable.Row,{key:index_620cf0a5e508688febdda5c962d22769},jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___purchases____purchase_state.item_product_names_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___purchases____purchase_state.item_quantities_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},("\u20b9 "+(reflex___state____state__state____global_state__pages___purchases____purchase_state.item_unit_prices_rx_state_?.at?.(idx_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ",")))),jsx(RadixThemesTable.Cell,{},(reflex___state____state__state____global_state__pages___purchases____purchase_state.item_tax_rates_rx_state_?.at?.(idx_rx_state_)+"%")),jsx(RadixThemesTable.Cell,{},("\u20b9 "+(reflex___state____state__state____global_state__pages___purchases____purchase_state.item_totals_rx_state_?.at?.(idx_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ",")))),jsx(RadixThemesTable.Cell,{},jsx(RadixThemesButton,{color:"red",css:({ ["icon"] : "trash-2" }),onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.remove_invoice_item", ({ ["index"] : ({ ["button"] : _e?.["button"], ["buttons"] : _e?.["buttons"], ["client_x"] : _e?.["clientX"], ["client_y"] : _e?.["clientY"], ["alt_key"] : _e?.["altKey"], ["ctrl_key"] : _e?.["ctrlKey"], ["meta_key"] : _e?.["metaKey"], ["shift_key"] : _e?.["shiftKey"] }) }), ({  })))], [_e], ({  })))),size:"1",variant:"outline"},"Remove")))))))
  )
}


function Text_3ba3765fd9bcdd669aafdda5239bb499 () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(RadixThemesText,{as:"p",css:({ ["marginTop"] : "2", ["color"] : "blue.600" }),size:"5",weight:"bold"},("\u20b9 "+(reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_total_rx_state_.toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ","))))
  )
}


function Fragment_e9557b009938023359b958ec2d1d46ce () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(Fragment,{},((reflex___state____state__state____global_state__pages___purchases____purchase_state.item_indices_rx_state_.length > 0)?(jsx(Fragment,{},jsx(RadixThemesBox,{css:({ ["width"] : "100%" })},jsx(RadixThemesTable.Root,{css:({ ["width"] : "100%" })},jsx(RadixThemesTable.Header,{},jsx(RadixThemesTable.Row,{},jsx(RadixThemesTable.ColumnHeaderCell,{},"Product"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Quantity"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Unit Price"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Tax Rate %"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Total"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Action"))),jsx(Table__body_44f82bce0fed7015f268983c7ffdc835,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",justify:"end",gap:"3"},jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesText,{as:"p",css:({ ["marginTop"] : "2" }),size:"5",weight:"bold"},"Total: "),jsx(Text_3ba3765fd9bcdd669aafdda5239bb499,{},))))):(jsx(Fragment,{},))))
  )
}


function Debounceinput_162b506798f67ac9443c12212b10526e () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_0e3f37c9b362838596a1e3d2049c3821 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.set_form_paid_amount", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_0e3f37c9b362838596a1e3d2049c3821,placeholder:"Paid Amount (optional)",step:"0.01",type:"number",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___purchases____purchase_state.form_paid_amount_rx_state_) ? reflex___state____state__state____global_state__pages___purchases____purchase_state.form_paid_amount_rx_state_ : "")},)
  )
}


function Button_dd47ea3ada2f7066ccba24db2074b778 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_6b70e6fdb0ea8861b99f55e6e1f163bf = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.set_show_form", ({ ["value"] : false }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{onClick:on_click_6b70e6fdb0ea8861b99f55e6e1f163bf,variant:"outline"},"Cancel")
  )
}


function Button_82d20f1bdb77a4faac303e863768fc2d () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_c780b42943dcccd6f632e6e3f58df1b3 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.save_purchase_invoice", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"blue",onClick:on_click_c780b42943dcccd6f632e6e3f58df1b3},"Save")
  )
}


function Fragment_ea029ab7f65ad71bea18318883f57f7e () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(Fragment,{},(reflex___state____state__state____global_state__pages___purchases____purchase_state.show_form_rx_state_?(jsx(Fragment,{},jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["border"] : "1px solid", ["borderColor"] : "gray.300", ["borderRadius"] : "lg", ["background"] : "white", ["width"] : "100%", ["marginBottom"] : "4" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesHeading,{size:"6"},"New Purchase Invoice"),jsx(Select__root_2b7ce3c43a87425321e8d788cbdd1335,{},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(Debounceinput_2675f6b963c3e3c6693494c16db7e1f9,{},),jsx(Debounceinput_6d6ac121b3b4fd0ebc7c467679f19c72,{},)),jsx(Debounceinput_08dd5ee5bd71106c2119c94640723c3e,{},),jsx(RadixThemesSeparator,{size:"4"},),jsx(RadixThemesHeading,{size:"5"},"Invoice Items"),jsx(RadixThemesBox,{css:({ ["padding"] : "3", ["border"] : "1px solid", ["borderColor"] : "gray.200", ["borderRadius"] : "md", ["background"] : "gray.50", ["width"] : "100%" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"2"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"2"},jsx(Select__root_721b8b562b52d9e89bb6b5e019e7e44f,{},),jsx(Debounceinput_09a3f250a5cf547af975ebddcc7c15c3,{},),jsx(Debounceinput_7c9278863b66b60d07dcb8114bacde09,{},),jsx(Debounceinput_95ddf19be7683c8fc959b0860a50edff,{},),jsx(Button_cf45bd92d141dc2ad9a35a364f4424b9,{},)))),jsx(Fragment_e9557b009938023359b958ec2d1d46ce,{},),jsx(RadixThemesSeparator,{size:"4"},),jsx(Debounceinput_162b506798f67ac9443c12212b10526e,{},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(Button_dd47ea3ada2f7066ccba24db2074b778,{},),jsx(Button_82d20f1bdb77a4faac303e863768fc2d,{},)))))):(jsx(Fragment,{},))))
  )
}


function Table__body_e93870483541dbe0a97efbb19fa877e9 () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);



  return (
    jsx(RadixThemesTable.Body,{},Array.prototype.map.call(reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_indices_rx_state_ ?? [],((idx_rx_state_,index_9ecd28625d43f0df6065e5298d5d739e)=>(jsx(RadixThemesTable.Row,{key:index_9ecd28625d43f0df6065e5298d5d739e},jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_numbers_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_dates_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___purchases____purchase_state.supplier_names_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},("\u20b9 "+(reflex___state____state__state____global_state__pages___purchases____purchase_state.total_amounts_rx_state_?.at?.(idx_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ",")))),jsx(RadixThemesTable.Cell,{},("\u20b9 "+(reflex___state____state__state____global_state__pages___purchases____purchase_state.paid_amounts_rx_state_?.at?.(idx_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ",")))),jsx(RadixThemesTable.Cell,{},jsx(Fragment,{},((reflex___state____state__state____global_state__pages___purchases____purchase_state.statuses_rx_state_?.at?.(idx_rx_state_)?.valueOf?.() === "PAID"?.valueOf?.())?(jsx(Fragment,{},jsx(RadixThemesBadge,{color:"green"},reflex___state____state__state____global_state__pages___purchases____purchase_state.statuses_rx_state_?.at?.(idx_rx_state_)))):(jsx(Fragment,{},((reflex___state____state__state____global_state__pages___purchases____purchase_state.statuses_rx_state_?.at?.(idx_rx_state_)?.valueOf?.() === "PARTIAL"?.valueOf?.())?(jsx(Fragment,{},jsx(RadixThemesBadge,{color:"orange"},reflex___state____state__state____global_state__pages___purchases____purchase_state.statuses_rx_state_?.at?.(idx_rx_state_)))):(jsx(Fragment,{},jsx(RadixThemesBadge,{color:"gray"},reflex___state____state__state____global_state__pages___purchases____purchase_state.statuses_rx_state_?.at?.(idx_rx_state_)))))))))),jsx(RadixThemesTable.Cell,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"2"},jsx(RadixThemesButton,{onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.set_selected_invoice_id", ({ ["invoice_id"] : reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_ids_rx_state_?.at?.(idx_rx_state_) }), ({  }))), (ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.view_invoice_details", ({ ["invoice_id"] : ({ ["button"] : _e?.["button"], ["buttons"] : _e?.["buttons"], ["client_x"] : _e?.["clientX"], ["client_y"] : _e?.["clientY"], ["alt_key"] : _e?.["altKey"], ["ctrl_key"] : _e?.["ctrlKey"], ["meta_key"] : _e?.["metaKey"], ["shift_key"] : _e?.["shiftKey"] }) }), ({  })))], [_e], ({  })))),size:"1",variant:"outline"},"View"),jsx(RadixThemesButton,{color:"red",onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.set_selected_invoice_id", ({ ["invoice_id"] : reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_ids_rx_state_?.at?.(idx_rx_state_) }), ({  }))), (ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.delete_purchase_invoice", ({ ["invoice_id"] : ({ ["button"] : _e?.["button"], ["buttons"] : _e?.["buttons"], ["client_x"] : _e?.["clientX"], ["client_y"] : _e?.["clientY"], ["alt_key"] : _e?.["altKey"], ["ctrl_key"] : _e?.["ctrlKey"], ["meta_key"] : _e?.["metaKey"], ["shift_key"] : _e?.["shiftKey"] }) }), ({  })))], [_e], ({  })))),size:"1",variant:"outline"},"Delete"))))))))
  )
}


function Fragment_7b097299c97504a272fe9cc290fbef85 () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(Fragment,{},((reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_indices_rx_state_.length > 0)?(jsx(Fragment,{},jsx(RadixThemesTable.Root,{css:({ ["width"] : "100%" })},jsx(RadixThemesTable.Header,{},jsx(RadixThemesTable.Row,{},jsx(RadixThemesTable.ColumnHeaderCell,{},"Invoice #"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Date"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Supplier"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Total"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Paid"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Status"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Actions"))),jsx(Table__body_e93870483541dbe0a97efbb19fa877e9,{},)))):(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.500", ["padding"] : "4" })},"No purchase invoices found. Click 'New Purchase Invoice' to create one.")))))
  )
}


function Fragment_d663d9b154b6a6c7f87a96f61db29819 () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(Fragment,{},(reflex___state____state__state____global_state__pages___purchases____purchase_state.is_loading_rx_state_?(jsx(Fragment,{},jsx(RadixThemesFlex,{css:({ ["display"] : "flex", ["alignItems"] : "center", ["justifyContent"] : "center", ["padding"] : "8" })},jsx(RadixThemesSpinner,{},)))):(jsx(Fragment_7b097299c97504a272fe9cc290fbef85,{},))))
  )
}


function Box_ad25384d03c2588a7d362fcf069f25a6 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_5d2195e33017902352389041cf2d13b8 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.close_details", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesBox,{css:({ ["position"] : "fixed", ["top"] : "0", ["left"] : "0", ["right"] : "0", ["bottom"] : "0", ["background"] : "black", ["opacity"] : "0.5", ["zIndex"] : "1000" }),onClick:on_click_5d2195e33017902352389041cf2d13b8},)
  )
}


function Fragment_c269d23579e302f6058679ce2f2018ad () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(Fragment,{},jsx(RadixThemesText,{as:"p"},"Invoice: "),reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_detail_number_rx_state_)
  )
}


function Fragment_7cda9d58e8b514506d6f1f8b7bed0fcb () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_detail_number_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment_c269d23579e302f6058679ce2f2018ad,{},)):(jsx(Fragment,{},jsx(RadixThemesText,{as:"p"},"Invoice Details")))))
  )
}


function Button_4837ac48a0404c465c6e0b3588e47ff2 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_5d2195e33017902352389041cf2d13b8 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.close_details", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{onClick:on_click_5d2195e33017902352389041cf2d13b8,variant:"ghost"},jsx(LucideX,{},))
  )
}


function Text_9f6bee67be73ceeb1d8949fa2d7f88b7 () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(RadixThemesText,{as:"p"},reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_detail_supplier_rx_state_)
  )
}


function Text_c8804d2d5e34e35ab6769a4e7ddcc1c1 () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(RadixThemesText,{as:"p"},reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_detail_date_rx_state_)
  )
}


function Text_8ef0e746b5b673ed5f567a21cb6a7e3b () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(RadixThemesText,{as:"p"},("\u20b9 "+(reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_detail_total_rx_state_.toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ","))))
  )
}


function Text_f8c75015d0166513b75680a9eb4524c9 () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(RadixThemesText,{as:"p"},("\u20b9 "+(reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_detail_paid_rx_state_.toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ","))))
  )
}


function Text_fe3adf9165bea38d85a92a5c7b39a4d9 () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(RadixThemesText,{as:"p",css:({ ["color"] : (((reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_detail_total_rx_state_ - reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_detail_paid_rx_state_) > 0) ? "orange.600" : "green.600") }),weight:"bold"},("\u20b9 "+((reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_detail_total_rx_state_ - reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_detail_paid_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ","))))
  )
}


function Badge_ad2f8ef86f569a8e7b3847867486acd5 () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(RadixThemesBadge,{color:((reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_detail_status_rx_state_?.valueOf?.() === "PAID"?.valueOf?.()) ? "green" : ((reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_detail_status_rx_state_?.valueOf?.() === "PARTIAL"?.valueOf?.()) ? "orange" : "gray"))},reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_detail_status_rx_state_)
  )
}


function Debounceinput_3437ff7c5cf20b2fbf9563331bbfe93d () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_e7dc6095ecc5599665b30dc7a72420ed = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.set_payment_amount", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_e7dc6095ecc5599665b30dc7a72420ed,placeholder:"Enter payment amount",type:"number",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___purchases____purchase_state.payment_amount_rx_state_) ? reflex___state____state__state____global_state__pages___purchases____purchase_state.payment_amount_rx_state_ : "")},)
  )
}


function Button_52c0b3a579576935bf4b7c3a825d732e () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_f0f6ac8823efb1b0727219fb07ccb443 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.record_payment", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"green",onClick:on_click_f0f6ac8823efb1b0727219fb07ccb443},"Record Payment")
  )
}


function Button_9ac1179edc364565b99dffc88dc7e586 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_829b026286234301e0c5f4c796233abc = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.toggle_payment_form", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{onClick:on_click_829b026286234301e0c5f4c796233abc,variant:"outline"},"Cancel")
  )
}


function Button_26a592272478a5cb8cd9ae32a50017e3 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_829b026286234301e0c5f4c796233abc = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.toggle_payment_form", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"blue",css:({ ["width"] : "100%" }),onClick:on_click_829b026286234301e0c5f4c796233abc},"Make Payment")
  )
}


function Fragment_f8ee5a909025955945d418ff27514578 () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(Fragment,{},(reflex___state____state__state____global_state__pages___purchases____purchase_state.show_payment_form_rx_state_?(jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(RadixThemesText,{as:"p",weight:"bold"},"Payment Amount: "),jsx(Debounceinput_3437ff7c5cf20b2fbf9563331bbfe93d,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"3"},jsx(Button_52c0b3a579576935bf4b7c3a825d732e,{},),jsx(Button_9ac1179edc364565b99dffc88dc7e586,{},))))):(jsx(Fragment,{},jsx(Button_26a592272478a5cb8cd9ae32a50017e3,{},)))))
  )
}


function Fragment_b94f10cef90d14d6b7382e7848699eee () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_detail_status_rx_state_?.valueOf?.() === "PAID"?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},jsx(RadixThemesSeparator,{size:"4"},),jsx(Fragment_f8ee5a909025955945d418ff27514578,{},)))):(jsx(Fragment,{},))))
  )
}


function Fragment_98a967b85c417afc557edf9da6a844b4 () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___purchases____purchase_state.invoice_detail_number_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(RadixThemesText,{as:"p",weight:"bold"},"Supplier: "),jsx(Text_9f6bee67be73ceeb1d8949fa2d7f88b7,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(RadixThemesText,{as:"p",weight:"bold"},"Date: "),jsx(Text_c8804d2d5e34e35ab6769a4e7ddcc1c1,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(RadixThemesText,{as:"p",weight:"bold"},"Total: "),jsx(Text_8ef0e746b5b673ed5f567a21cb6a7e3b,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(RadixThemesText,{as:"p",weight:"bold"},"Paid: "),jsx(Text_f8c75015d0166513b75680a9eb4524c9,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(RadixThemesText,{as:"p",weight:"bold"},"Outstanding: "),jsx(Text_fe3adf9165bea38d85a92a5c7b39a4d9,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(RadixThemesText,{as:"p",weight:"bold"},"Status: "),jsx(Badge_ad2f8ef86f569a8e7b3847867486acd5,{},)),jsx(Fragment_b94f10cef90d14d6b7382e7848699eee,{},)))):(jsx(Fragment,{},jsx(RadixThemesFlex,{css:({ ["display"] : "flex", ["alignItems"] : "center", ["justifyContent"] : "center", ["padding"] : "4" })},jsx(RadixThemesSpinner,{},))))))
  )
}


function Button_8f333fd6bd3f278565e6738b99d1ff78 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_5d2195e33017902352389041cf2d13b8 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___purchases____purchase_state.close_details", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{onClick:on_click_5d2195e33017902352389041cf2d13b8,variant:"outline"},"Close")
  )
}


function Fragment_bb59ecd2998d53b5a8c6b5d796465bcd () {
  const reflex___state____state__state____global_state__pages___purchases____purchase_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___purchases____purchase_state)



  return (
    jsx(Fragment,{},((reflex___state____state__state____global_state__pages___purchases____purchase_state.show_details_id_rx_state_ > 0)?(jsx(Fragment,{},jsx(RadixThemesBox,{css:({ ["position"] : "fixed", ["top"] : "0", ["left"] : "0", ["right"] : "0", ["bottom"] : "0", ["zIndex"] : "999" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100%" }),direction:"column",gap:"3"},jsx(Box_ad25384d03c2588a7d362fcf069f25a6,{},),jsx(RadixThemesBox,{css:({ ["position"] : "fixed", ["top"] : "50%", ["left"] : "50%", ["transform"] : "translate(-50%, -50%)", ["background"] : "white", ["borderRadius"] : "lg", ["border"] : "1px solid", ["borderColor"] : "gray.300", ["boxShadow"] : "lg", ["zIndex"] : "1001", ["minWidth"] : "500px", ["maxWidth"] : "90%", ["maxHeight"] : "90%", ["overflow"] : "auto" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["padding"] : "6" }),direction:"column",gap:"4"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(RadixThemesHeading,{size:"6"},jsx(Fragment_7cda9d58e8b514506d6f1f8b7bed0fcb,{},)),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(Button_4837ac48a0404c465c6e0b3588e47ff2,{},)),jsx(Fragment_98a967b85c417afc557edf9da6a844b4,{},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",justify:"end",gap:"3"},jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(Button_8f333fd6bd3f278565e6738b99d1ff78,{},)))))))):(jsx(Fragment,{},))))
  )
}


export default function Component() {





  return (
    jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100vh" }),direction:"row",gap:"0"},jsx(RadixThemesBox,{css:({ ["width"] : "250px", ["height"] : "100vh", ["padding"] : "4", ["background"] : "gray.50", ["borderRight"] : "1px solid", ["borderColor"] : "gray.200" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesHeading,{css:({ ["padding"] : "4" }),size:"6"},"Billinator"),jsx(RadixThemesSeparator,{size:"4"},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["padding"] : "2" }),direction:"column",gap:"2"},jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/dashboard"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideHome,{size:20},),jsx(RadixThemesText,{as:"p"},"Dashboard")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/products"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucidePackage,{size:20},),jsx(RadixThemesText,{as:"p"},"Products")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/customers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUsers,{size:20},),jsx(RadixThemesText,{as:"p"},"Customers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/suppliers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideTruck,{size:20},),jsx(RadixThemesText,{as:"p"},"Suppliers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/purchases"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideShoppingCart,{size:20},),jsx(RadixThemesText,{as:"p"},"Purchases")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/sales"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideReceipt,{size:20},),jsx(RadixThemesText,{as:"p"},"Sales")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/stocks"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideWarehouse,{size:20},),jsx(RadixThemesText,{as:"p"},"Stocks")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/outstanding"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideDollarSign,{size:20},),jsx(RadixThemesText,{as:"p"},"Outstanding")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/reports"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideBarChart,{size:20},),jsx(RadixThemesText,{as:"p"},"Reports")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/users"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUserCog,{size:20},),jsx(RadixThemesText,{as:"p"},"Users & Roles")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/settings"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideSettings,{size:20},),jsx(RadixThemesText,{as:"p"},"Settings"))))))),jsx(RadixThemesBox,{css:({ ["flex"] : "1", ["padding"] : "6", ["overflowY"] : "auto", ["height"] : "100vh" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%", ["marginBottom"] : "4" }),direction:"row",gap:"3"},jsx(RadixThemesHeading,{size:"9",weight:"bold"},"Purchase Invoices"),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"3"},jsx(Button_b4ed0357e078c989e3450a56becc97a2,{},),jsx(Button_2272ce24b42fcb33b76be67565ce867a,{},))),jsx(Fragment_d2dd7c0e0018fd9d514146aecc443c02,{},),jsx(Fragment_5221c829c11ec1d8e9cbb886b5dd6eea,{},),jsx(Fragment_ea029ab7f65ad71bea18318883f57f7e,{},),jsx(Fragment_d663d9b154b6a6c7f87a96f61db29819,{},),jsx(Fragment_bb59ecd2998d53b5a8c6b5d796465bcd,{},)))),jsx("title",{},"Purchases - Billinator"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}