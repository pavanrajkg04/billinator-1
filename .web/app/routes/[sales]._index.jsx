import {Fragment,useCallback,useContext,useEffect} from "react"
import {Badge as RadixThemesBadge,Box as RadixThemesBox,Button as RadixThemesButton,Callout as RadixThemesCallout,Flex as RadixThemesFlex,Heading as RadixThemesHeading,Link as RadixThemesLink,Select as RadixThemesSelect,Separator as RadixThemesSeparator,Spinner as RadixThemesSpinner,Table as RadixThemesTable,Text as RadixThemesText,TextArea as RadixThemesTextArea,TextField as RadixThemesTextField} from "@radix-ui/themes"
import {Link as ReactRouterLink} from "react-router"
import {BarChart as LucideBarChart,Check as LucideCheck,CircleHelp as LucideCircleHelp,DollarSign as LucideDollarSign,Home as LucideHome,Package as LucidePackage,Receipt as LucideReceipt,Settings as LucideSettings,ShoppingCart as LucideShoppingCart,TriangleAlert as LucideTriangleAlert,Truck as LucideTruck,UserCog as LucideUserCog,Users as LucideUsers,Warehouse as LucideWarehouse,X as LucideX} from "lucide-react"
import {EventLoopContext,StateContexts} from "$/utils/context"
import {ReflexEvent,isNotNullOrUndefined,isTrue} from "$/utils/state"
import DebounceInput from "react-debounce-input"
import {jsx} from "@emotion/react"




function Button_f7aab9c277d2f138a58f7ddfec9b6d87 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_6c7325b71f7f455d83379f3cb054180c = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.refresh_sales", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{css:({ ["icon"] : "refresh-cw" }),onClick:on_click_6c7325b71f7f455d83379f3cb054180c,variant:"outline"},"Refresh")
  )
}


function Button_5ec062e3c5dc533f75f293f944d3ba09 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_74596cc42334199bfcc5b131167a16dd = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.open_create_form", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"blue",css:({ ["icon"] : "plus" }),onClick:on_click_74596cc42334199bfcc5b131167a16dd},"New Sales Invoice")
  )
}


function Callout__text_4c5499f00dc73742eb0c58db962a321e () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(RadixThemesCallout.Text,{},reflex___state____state__state____global_state__pages___sales____sales_state.error_message_rx_state_)
  )
}


function Fragment_1c1bd071a75c624e537fbe5348bb6c47 () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___sales____sales_state.error_message_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesCallout.Root,{color:"red",css:({ ["icon"] : "triangle_alert", ["width"] : "100%" })},jsx(RadixThemesCallout.Icon,{},jsx(LucideTriangleAlert,{},)),jsx(Callout__text_4c5499f00dc73742eb0c58db962a321e,{},)))):(jsx(Fragment,{},))))
  )
}


function Callout__text_b58db3017e50f3da27a1c884a77a5d96 () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(RadixThemesCallout.Text,{},reflex___state____state__state____global_state__pages___sales____sales_state.success_message_rx_state_)
  )
}


function Fragment_ec0ae79f1ad4ec37e5d759ef24aabd8e () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___sales____sales_state.success_message_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesCallout.Root,{color:"green",css:({ ["icon"] : "check", ["width"] : "100%" })},jsx(RadixThemesCallout.Icon,{},jsx(LucideCheck,{},)),jsx(Callout__text_b58db3017e50f3da27a1c884a77a5d96,{},)))):(jsx(Fragment,{},))))
  )
}


function Callout__text_253503f6eab0b28bdd649cd97e57b02a () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(RadixThemesCallout.Text,{},reflex___state____state__state____global_state__pages___sales____sales_state.warning_message_rx_state_)
  )
}


function Fragment_00dcea417c42b3654c3752ed65d61dbf () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___sales____sales_state.warning_message_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesCallout.Root,{color:"yellow",css:({ ["icon"] : "alert-triangle", ["width"] : "100%" })},jsx(RadixThemesCallout.Icon,{},jsx(LucideCircleHelp,{},)),jsx(Callout__text_253503f6eab0b28bdd649cd97e57b02a,{},)))):(jsx(Fragment,{},))))
  )
}


function Select__group_f8795c2957fd2f3cafffefe14b08acc4 () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(RadixThemesSelect.Group,{},"",Array.prototype.map.call(reflex___state____state__state____global_state__pages___sales____sales_state.customer_options_rx_state_ ?? [],((item_rx_state_,index_a4c056de887ac0859af139cad1744de9)=>(jsx(RadixThemesSelect.Item,{key:index_a4c056de887ac0859af139cad1744de9,value:item_rx_state_},item_rx_state_)))))
  )
}


function Select__root_ad82122fdef4ae6ced80f941447d54ad () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_1fa69da9f19b3a1d227a4d6d37944a47 = useCallback(((_ev_0) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.set_form_customer_id", ({ ["value"] : _ev_0 }), ({  })))], [_ev_0], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesSelect.Root,{onValueChange:on_change_1fa69da9f19b3a1d227a4d6d37944a47},jsx(RadixThemesSelect.Trigger,{css:({ ["width"] : "100%" }),placeholder:"Select Customer (optional - leave empty for walk-in)"},),jsx(RadixThemesSelect.Content,{},jsx(Select__group_f8795c2957fd2f3cafffefe14b08acc4,{},)))
  )
}


function Select__root_8b6d7daeddbc8f0500a0ca511181b538 () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_c7150840d1e15da046d6738ab86d984d = useCallback(((_ev_0) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.set_form_invoice_type", ({ ["value"] : _ev_0 }), ({  })))], [_ev_0], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesSelect.Root,{onValueChange:on_change_c7150840d1e15da046d6738ab86d984d,value:reflex___state____state__state____global_state__pages___sales____sales_state.form_invoice_type_rx_state_},jsx(RadixThemesSelect.Trigger,{css:({ ["width"] : "100%" })},),jsx(RadixThemesSelect.Content,{},jsx(RadixThemesSelect.Group,{},"",jsx(RadixThemesSelect.Item,{value:"B2B"},"B2B"),jsx(RadixThemesSelect.Item,{value:"B2C"},"B2C"),jsx(RadixThemesSelect.Item,{value:"BILL_OF_SUPPLY"},"BILL_OF_SUPPLY"))))
  )
}


function Debounceinput_2b74c04e90e20ae053ea6e2a644d0b6f () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_897ea8ebdc976a7b70edd493e185abb3 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.set_form_invoice_date", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_897ea8ebdc976a7b70edd493e185abb3,placeholder:"Invoice Date",type:"date",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___sales____sales_state.form_invoice_date_rx_state_) ? reflex___state____state__state____global_state__pages___sales____sales_state.form_invoice_date_rx_state_ : "")},)
  )
}


function Debounceinput_087881fa85ee77791959ddac24ae5b4a () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_6cfac2a63ec0e821d28b4ff66dc58f07 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.set_form_due_date", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_6cfac2a63ec0e821d28b4ff66dc58f07,placeholder:"Due Date (optional)",type:"date",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___sales____sales_state.form_due_date_rx_state_) ? reflex___state____state__state____global_state__pages___sales____sales_state.form_due_date_rx_state_ : "")},)
  )
}


function Debounceinput_4850312c292c488fe21090e0af3edb2d () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_2c3aaa375975e765075a12338a1953b9 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.set_form_place_of_supply", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_2c3aaa375975e765075a12338a1953b9,placeholder:"Place of Supply (optional)",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___sales____sales_state.form_place_of_supply_rx_state_) ? reflex___state____state__state____global_state__pages___sales____sales_state.form_place_of_supply_rx_state_ : "")},)
  )
}


function Debounceinput_4cd2004d6f088df17d0afbdeef21b7f7 () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_113f4dd5455a01c696ae887505eb60cb = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.set_form_notes", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextArea,onChange:on_change_113f4dd5455a01c696ae887505eb60cb,placeholder:"Notes (optional)",value:reflex___state____state__state____global_state__pages___sales____sales_state.form_notes_rx_state_},)
  )
}


function Select__group_c509479f7183005fc9f312f1c0c120d3 () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(RadixThemesSelect.Group,{},"",Array.prototype.map.call(reflex___state____state__state____global_state__pages___sales____sales_state.product_options_rx_state_ ?? [],((item_rx_state_,index_a4c056de887ac0859af139cad1744de9)=>(jsx(RadixThemesSelect.Item,{key:index_a4c056de887ac0859af139cad1744de9,value:item_rx_state_},item_rx_state_)))))
  )
}


function Select__root_5aff830828069eeb2b21086a15165bcb () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_80daaaf3fc75711e4f051a2a54e7c641 = useCallback(((_ev_0) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.set_current_item_product_id", ({ ["value"] : _ev_0 }), ({  })))], [_ev_0], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesSelect.Root,{onValueChange:on_change_80daaaf3fc75711e4f051a2a54e7c641},jsx(RadixThemesSelect.Trigger,{css:({ ["width"] : "40%" }),placeholder:"Select Product *"},),jsx(RadixThemesSelect.Content,{},jsx(Select__group_c509479f7183005fc9f312f1c0c120d3,{},)))
  )
}


function Debounceinput_c88b7862d3e4ed8bd131b77fe4e5a084 () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_20cf0390b737f80c9d3b3616ae33ef7a = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.set_current_item_quantity", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "15%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_20cf0390b737f80c9d3b3616ae33ef7a,placeholder:"Quantity *",step:"0.001",type:"number",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___sales____sales_state.current_item_quantity_rx_state_) ? reflex___state____state__state____global_state__pages___sales____sales_state.current_item_quantity_rx_state_ : "")},)
  )
}


function Debounceinput_ac275e0a3aa0e818e8ba0e257f0379de () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_6fb1ce712eae8246053731d3a2bd66fe = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.set_current_item_unit_price", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "15%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_6fb1ce712eae8246053731d3a2bd66fe,placeholder:"Unit Price *",step:"0.01",type:"number",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___sales____sales_state.current_item_unit_price_rx_state_) ? reflex___state____state__state____global_state__pages___sales____sales_state.current_item_unit_price_rx_state_ : "")},)
  )
}


function Debounceinput_49e0b0c80dbe25cfa646b201ee7c09c5 () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_65aa5ff2c9f75e4985f883602de8091a = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.set_current_item_tax_rate", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "15%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_65aa5ff2c9f75e4985f883602de8091a,placeholder:"Tax Rate %",step:"0.01",type:"number",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___sales____sales_state.current_item_tax_rate_rx_state_) ? reflex___state____state__state____global_state__pages___sales____sales_state.current_item_tax_rate_rx_state_ : "")},)
  )
}


function Button_3a26eb3beda4f0ff48147c9c49d48870 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_4c041ff89701794ee7f1a2685224fbe3 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.add_invoice_item", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"green",css:({ ["icon"] : "plus", ["width"] : "15%" }),onClick:on_click_4c041ff89701794ee7f1a2685224fbe3},"Add Item")
  )
}


function Table__body_9d7371e05252eeb92073bdc057b41b1d () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);



  return (
    jsx(RadixThemesTable.Body,{},Array.prototype.map.call(reflex___state____state__state____global_state__pages___sales____sales_state.item_indices_rx_state_ ?? [],((idx_rx_state_,index_620cf0a5e508688febdda5c962d22769)=>(jsx(RadixThemesTable.Row,{key:index_620cf0a5e508688febdda5c962d22769},jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___sales____sales_state.item_product_names_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___sales____sales_state.item_quantities_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},("\u20b9 "+(reflex___state____state__state____global_state__pages___sales____sales_state.item_unit_prices_rx_state_?.at?.(idx_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ",")))),jsx(RadixThemesTable.Cell,{},(reflex___state____state__state____global_state__pages___sales____sales_state.item_tax_rates_rx_state_?.at?.(idx_rx_state_)+"%")),jsx(RadixThemesTable.Cell,{},("\u20b9 "+(reflex___state____state__state____global_state__pages___sales____sales_state.item_totals_rx_state_?.at?.(idx_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ",")))),jsx(RadixThemesTable.Cell,{},jsx(RadixThemesButton,{color:"red",css:({ ["icon"] : "trash-2" }),onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.remove_invoice_item", ({ ["index"] : ({ ["button"] : _e?.["button"], ["buttons"] : _e?.["buttons"], ["client_x"] : _e?.["clientX"], ["client_y"] : _e?.["clientY"], ["alt_key"] : _e?.["altKey"], ["ctrl_key"] : _e?.["ctrlKey"], ["meta_key"] : _e?.["metaKey"], ["shift_key"] : _e?.["shiftKey"] }) }), ({  })))], [_e], ({  })))),size:"1",variant:"outline"},"Remove")))))))
  )
}


function Text_e6c43cad66fbf8caa96d8b8b6c44779e () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(RadixThemesText,{as:"p",css:({ ["marginTop"] : "2", ["color"] : "blue.600" }),size:"5",weight:"bold"},("\u20b9 "+(reflex___state____state__state____global_state__pages___sales____sales_state.invoice_total_rx_state_.toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ","))))
  )
}


function Fragment_715b6088fbfd954cb8049117e7355a2f () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(Fragment,{},((reflex___state____state__state____global_state__pages___sales____sales_state.item_indices_rx_state_.length > 0)?(jsx(Fragment,{},jsx(RadixThemesBox,{css:({ ["width"] : "100%" })},jsx(RadixThemesTable.Root,{css:({ ["width"] : "100%" })},jsx(RadixThemesTable.Header,{},jsx(RadixThemesTable.Row,{},jsx(RadixThemesTable.ColumnHeaderCell,{},"Product"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Quantity"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Unit Price"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Tax Rate %"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Total"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Action"))),jsx(Table__body_9d7371e05252eeb92073bdc057b41b1d,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",justify:"end",gap:"3"},jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesText,{as:"p",css:({ ["marginTop"] : "2" }),size:"5",weight:"bold"},"Total: "),jsx(Text_e6c43cad66fbf8caa96d8b8b6c44779e,{},))))):(jsx(Fragment,{},))))
  )
}


function Debounceinput_c4604026729610843360e11e2df95399 () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_943d28b16dca67d664f068c8e0fca872 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.set_form_paid_amount", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_943d28b16dca67d664f068c8e0fca872,placeholder:"Paid Amount (optional)",step:"0.01",type:"number",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___sales____sales_state.form_paid_amount_rx_state_) ? reflex___state____state__state____global_state__pages___sales____sales_state.form_paid_amount_rx_state_ : "")},)
  )
}


function Button_0a6128b728180098b6f00ed41a50d759 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_081507764ef7ea44586d7cd0304c2a2b = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.set_show_form", ({ ["value"] : false }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{onClick:on_click_081507764ef7ea44586d7cd0304c2a2b,variant:"outline"},"Cancel")
  )
}


function Button_2974b44d8465200688e94521ddd3823c () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_74999700ba04b6b1df9330443519c876 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.save_sales_invoice", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"blue",onClick:on_click_74999700ba04b6b1df9330443519c876},"Save")
  )
}


function Fragment_85ab841b0ed2d17f25561274fd01f17a () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(Fragment,{},(reflex___state____state__state____global_state__pages___sales____sales_state.show_form_rx_state_?(jsx(Fragment,{},jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["border"] : "1px solid", ["borderColor"] : "gray.300", ["borderRadius"] : "lg", ["background"] : "white", ["width"] : "100%", ["marginBottom"] : "4" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesHeading,{size:"6"},"New Sales Invoice"),jsx(Select__root_ad82122fdef4ae6ced80f941447d54ad,{},),jsx(Select__root_8b6d7daeddbc8f0500a0ca511181b538,{},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(Debounceinput_2b74c04e90e20ae053ea6e2a644d0b6f,{},),jsx(Debounceinput_087881fa85ee77791959ddac24ae5b4a,{},)),jsx(Debounceinput_4850312c292c488fe21090e0af3edb2d,{},),jsx(Debounceinput_4cd2004d6f088df17d0afbdeef21b7f7,{},),jsx(RadixThemesSeparator,{size:"4"},),jsx(RadixThemesHeading,{size:"5"},"Invoice Items"),jsx(RadixThemesBox,{css:({ ["padding"] : "3", ["border"] : "1px solid", ["borderColor"] : "gray.200", ["borderRadius"] : "md", ["background"] : "gray.50", ["width"] : "100%" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"2"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"2"},jsx(Select__root_5aff830828069eeb2b21086a15165bcb,{},),jsx(Debounceinput_c88b7862d3e4ed8bd131b77fe4e5a084,{},),jsx(Debounceinput_ac275e0a3aa0e818e8ba0e257f0379de,{},),jsx(Debounceinput_49e0b0c80dbe25cfa646b201ee7c09c5,{},),jsx(Button_3a26eb3beda4f0ff48147c9c49d48870,{},)))),jsx(Fragment_715b6088fbfd954cb8049117e7355a2f,{},),jsx(RadixThemesSeparator,{size:"4"},),jsx(Debounceinput_c4604026729610843360e11e2df95399,{},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(Button_0a6128b728180098b6f00ed41a50d759,{},),jsx(Button_2974b44d8465200688e94521ddd3823c,{},)))))):(jsx(Fragment,{},))))
  )
}


function Table__body_dc5426f5037608bce06987bf4fad2dee () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);



  return (
    jsx(RadixThemesTable.Body,{},Array.prototype.map.call(reflex___state____state__state____global_state__pages___sales____sales_state.invoice_indices_rx_state_ ?? [],((idx_rx_state_,index_9ecd28625d43f0df6065e5298d5d739e)=>(jsx(RadixThemesTable.Row,{key:index_9ecd28625d43f0df6065e5298d5d739e},jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___sales____sales_state.invoice_numbers_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___sales____sales_state.invoice_dates_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},reflex___state____state__state____global_state__pages___sales____sales_state.customer_names_rx_state_?.at?.(idx_rx_state_)),jsx(RadixThemesTable.Cell,{},("\u20b9 "+(reflex___state____state__state____global_state__pages___sales____sales_state.total_amounts_rx_state_?.at?.(idx_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ",")))),jsx(RadixThemesTable.Cell,{},("\u20b9 "+(reflex___state____state__state____global_state__pages___sales____sales_state.paid_amounts_rx_state_?.at?.(idx_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ",")))),jsx(RadixThemesTable.Cell,{},jsx(Fragment,{},((reflex___state____state__state____global_state__pages___sales____sales_state.statuses_rx_state_?.at?.(idx_rx_state_)?.valueOf?.() === "PAID"?.valueOf?.())?(jsx(Fragment,{},jsx(RadixThemesBadge,{color:"green"},reflex___state____state__state____global_state__pages___sales____sales_state.statuses_rx_state_?.at?.(idx_rx_state_)))):(jsx(Fragment,{},((reflex___state____state__state____global_state__pages___sales____sales_state.statuses_rx_state_?.at?.(idx_rx_state_)?.valueOf?.() === "PARTIAL"?.valueOf?.())?(jsx(Fragment,{},jsx(RadixThemesBadge,{color:"orange"},reflex___state____state__state____global_state__pages___sales____sales_state.statuses_rx_state_?.at?.(idx_rx_state_)))):(jsx(Fragment,{},jsx(RadixThemesBadge,{color:"gray"},reflex___state____state__state____global_state__pages___sales____sales_state.statuses_rx_state_?.at?.(idx_rx_state_)))))))))),jsx(RadixThemesTable.Cell,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"2"},jsx(RadixThemesButton,{onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.set_selected_invoice_id", ({ ["invoice_id"] : reflex___state____state__state____global_state__pages___sales____sales_state.invoice_ids_rx_state_?.at?.(idx_rx_state_) }), ({  }))), (ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.view_invoice_details", ({ ["invoice_id"] : ({ ["button"] : _e?.["button"], ["buttons"] : _e?.["buttons"], ["client_x"] : _e?.["clientX"], ["client_y"] : _e?.["clientY"], ["alt_key"] : _e?.["altKey"], ["ctrl_key"] : _e?.["ctrlKey"], ["meta_key"] : _e?.["metaKey"], ["shift_key"] : _e?.["shiftKey"] }) }), ({  })))], [_e], ({  })))),size:"1",variant:"outline"},"View"),jsx(RadixThemesButton,{color:"red",onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.set_selected_invoice_id", ({ ["invoice_id"] : reflex___state____state__state____global_state__pages___sales____sales_state.invoice_ids_rx_state_?.at?.(idx_rx_state_) }), ({  }))), (ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.delete_sales_invoice", ({ ["invoice_id"] : ({ ["button"] : _e?.["button"], ["buttons"] : _e?.["buttons"], ["client_x"] : _e?.["clientX"], ["client_y"] : _e?.["clientY"], ["alt_key"] : _e?.["altKey"], ["ctrl_key"] : _e?.["ctrlKey"], ["meta_key"] : _e?.["metaKey"], ["shift_key"] : _e?.["shiftKey"] }) }), ({  })))], [_e], ({  })))),size:"1",variant:"outline"},"Delete"))))))))
  )
}


function Fragment_6e0eae7934324f8efb67a519b3812067 () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(Fragment,{},((reflex___state____state__state____global_state__pages___sales____sales_state.invoice_indices_rx_state_.length > 0)?(jsx(Fragment,{},jsx(RadixThemesTable.Root,{css:({ ["width"] : "100%" })},jsx(RadixThemesTable.Header,{},jsx(RadixThemesTable.Row,{},jsx(RadixThemesTable.ColumnHeaderCell,{},"Invoice #"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Date"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Customer"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Total"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Paid"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Status"),jsx(RadixThemesTable.ColumnHeaderCell,{},"Actions"))),jsx(Table__body_dc5426f5037608bce06987bf4fad2dee,{},)))):(jsx(Fragment,{},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.500", ["padding"] : "4" })},"No sales invoices found. Click 'New Sales Invoice' to create one.")))))
  )
}


function Fragment_470438087a5aabf27850b5d1e6ab8674 () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(Fragment,{},(reflex___state____state__state____global_state__pages___sales____sales_state.is_loading_rx_state_?(jsx(Fragment,{},jsx(RadixThemesFlex,{css:({ ["display"] : "flex", ["alignItems"] : "center", ["justifyContent"] : "center", ["padding"] : "8" })},jsx(RadixThemesSpinner,{},)))):(jsx(Fragment_6e0eae7934324f8efb67a519b3812067,{},))))
  )
}


function Box_a756181e3cd5a354dd5dd9f6c0f4af1f () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_74d6fdcb66db37c68e58676c904d9eff = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.close_details", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesBox,{css:({ ["position"] : "fixed", ["top"] : "0", ["left"] : "0", ["right"] : "0", ["bottom"] : "0", ["background"] : "black", ["opacity"] : "0.5", ["zIndex"] : "1000" }),onClick:on_click_74d6fdcb66db37c68e58676c904d9eff},)
  )
}


function Fragment_384026d463b3958d11c2e532cd8995a2 () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(Fragment,{},jsx(RadixThemesText,{as:"p"},"Invoice: "),reflex___state____state__state____global_state__pages___sales____sales_state.invoice_detail_number_rx_state_)
  )
}


function Fragment_36473de52dc2458231955df647662bd7 () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___sales____sales_state.invoice_detail_number_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment_384026d463b3958d11c2e532cd8995a2,{},)):(jsx(Fragment,{},jsx(RadixThemesText,{as:"p"},"Invoice Details")))))
  )
}


function Button_925119bcd78900a0655ba56b0bfcb365 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_74d6fdcb66db37c68e58676c904d9eff = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.close_details", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{onClick:on_click_74d6fdcb66db37c68e58676c904d9eff,variant:"ghost"},jsx(LucideX,{},))
  )
}


function Text_bd365f41307f3d7bc1a77ed31ac7454d () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(RadixThemesText,{as:"p"},reflex___state____state__state____global_state__pages___sales____sales_state.invoice_detail_customer_rx_state_)
  )
}


function Text_260389ef2be74ad494a0ca0493958a73 () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(RadixThemesText,{as:"p"},reflex___state____state__state____global_state__pages___sales____sales_state.invoice_detail_date_rx_state_)
  )
}


function Text_25a682715f3b5a83a087d5b9e4f13181 () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(RadixThemesText,{as:"p"},("\u20b9 "+(reflex___state____state__state____global_state__pages___sales____sales_state.invoice_detail_total_rx_state_.toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ","))))
  )
}


function Text_8df4c6584bb732e07e28d7d252e58c1f () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(RadixThemesText,{as:"p"},("\u20b9 "+(reflex___state____state__state____global_state__pages___sales____sales_state.invoice_detail_paid_rx_state_.toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ","))))
  )
}


function Text_62ac05d91e8938f1e9054864df016d55 () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(RadixThemesText,{as:"p",css:({ ["color"] : (((reflex___state____state__state____global_state__pages___sales____sales_state.invoice_detail_total_rx_state_ - reflex___state____state__state____global_state__pages___sales____sales_state.invoice_detail_paid_rx_state_) > 0) ? "orange.600" : "green.600") }),weight:"bold"},("\u20b9 "+((reflex___state____state__state____global_state__pages___sales____sales_state.invoice_detail_total_rx_state_ - reflex___state____state__state____global_state__pages___sales____sales_state.invoice_detail_paid_rx_state_).toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ","))))
  )
}


function Badge_150a0844441b5c6e52dc09d4c36c16e9 () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(RadixThemesBadge,{color:((reflex___state____state__state____global_state__pages___sales____sales_state.invoice_detail_status_rx_state_?.valueOf?.() === "PAID"?.valueOf?.()) ? "green" : ((reflex___state____state__state____global_state__pages___sales____sales_state.invoice_detail_status_rx_state_?.valueOf?.() === "PARTIAL"?.valueOf?.()) ? "orange" : "gray"))},reflex___state____state__state____global_state__pages___sales____sales_state.invoice_detail_status_rx_state_)
  )
}


function Debounceinput_c90808f5e32508957434950803d1c35e () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_61825a088b25629cbf8c714483d15062 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.set_payment_amount", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_61825a088b25629cbf8c714483d15062,placeholder:"Enter payment amount",type:"number",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___sales____sales_state.payment_amount_rx_state_) ? reflex___state____state__state____global_state__pages___sales____sales_state.payment_amount_rx_state_ : "")},)
  )
}


function Button_d4e78c72487ae129a31dfaf19734a8bc () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_e17e928ce3de60f72c07a1dfa12aca83 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.record_payment", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"green",onClick:on_click_e17e928ce3de60f72c07a1dfa12aca83},"Record Payment")
  )
}


function Button_5f1e91265a5f7c79e32367269adb6ccd () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_29e8afcef660f644abe037771b5bac69 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.toggle_payment_form", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{onClick:on_click_29e8afcef660f644abe037771b5bac69,variant:"outline"},"Cancel")
  )
}


function Button_390621748f0d1f944a8282aa8386095d () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_29e8afcef660f644abe037771b5bac69 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.toggle_payment_form", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"blue",css:({ ["width"] : "100%" }),onClick:on_click_29e8afcef660f644abe037771b5bac69},"Make Payment")
  )
}


function Fragment_451ac3ab9a31c7f822488b8721d233d0 () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(Fragment,{},(reflex___state____state__state____global_state__pages___sales____sales_state.show_payment_form_rx_state_?(jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(RadixThemesText,{as:"p",weight:"bold"},"Payment Amount: "),jsx(Debounceinput_c90808f5e32508957434950803d1c35e,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"3"},jsx(Button_d4e78c72487ae129a31dfaf19734a8bc,{},),jsx(Button_5f1e91265a5f7c79e32367269adb6ccd,{},))))):(jsx(Fragment,{},jsx(Button_390621748f0d1f944a8282aa8386095d,{},)))))
  )
}


function Fragment_09519c624045bf1e79ce5b735c5891df () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___sales____sales_state.invoice_detail_status_rx_state_?.valueOf?.() === "PAID"?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},jsx(RadixThemesSeparator,{size:"4"},),jsx(Fragment_451ac3ab9a31c7f822488b8721d233d0,{},)))):(jsx(Fragment,{},))))
  )
}


function Fragment_ead898a7dcde397cf6162c15b54c892b () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___sales____sales_state.invoice_detail_number_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(RadixThemesText,{as:"p",weight:"bold"},"Customer: "),jsx(Text_bd365f41307f3d7bc1a77ed31ac7454d,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(RadixThemesText,{as:"p",weight:"bold"},"Date: "),jsx(Text_260389ef2be74ad494a0ca0493958a73,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(RadixThemesText,{as:"p",weight:"bold"},"Total: "),jsx(Text_25a682715f3b5a83a087d5b9e4f13181,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(RadixThemesText,{as:"p",weight:"bold"},"Paid: "),jsx(Text_8df4c6584bb732e07e28d7d252e58c1f,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(RadixThemesText,{as:"p",weight:"bold"},"Outstanding: "),jsx(Text_62ac05d91e8938f1e9054864df016d55,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(RadixThemesText,{as:"p",weight:"bold"},"Status: "),jsx(Badge_150a0844441b5c6e52dc09d4c36c16e9,{},)),jsx(Fragment_09519c624045bf1e79ce5b735c5891df,{},)))):(jsx(Fragment,{},jsx(RadixThemesFlex,{css:({ ["display"] : "flex", ["alignItems"] : "center", ["justifyContent"] : "center", ["padding"] : "4" })},jsx(RadixThemesSpinner,{},))))))
  )
}


function Button_0a0367e3b513ce420ab613a834503be4 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_74d6fdcb66db37c68e58676c904d9eff = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___sales____sales_state.close_details", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{onClick:on_click_74d6fdcb66db37c68e58676c904d9eff,variant:"outline"},"Close")
  )
}


function Fragment_e2678cb76308dee3236865634a1175d8 () {
  const reflex___state____state__state____global_state__pages___sales____sales_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___sales____sales_state)



  return (
    jsx(Fragment,{},((reflex___state____state__state____global_state__pages___sales____sales_state.show_details_id_rx_state_ > 0)?(jsx(Fragment,{},jsx(RadixThemesBox,{css:({ ["position"] : "fixed", ["top"] : "0", ["left"] : "0", ["right"] : "0", ["bottom"] : "0", ["zIndex"] : "999" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100%" }),direction:"column",gap:"3"},jsx(Box_a756181e3cd5a354dd5dd9f6c0f4af1f,{},),jsx(RadixThemesBox,{css:({ ["position"] : "fixed", ["top"] : "50%", ["left"] : "50%", ["transform"] : "translate(-50%, -50%)", ["background"] : "white", ["borderRadius"] : "lg", ["border"] : "1px solid", ["borderColor"] : "gray.300", ["boxShadow"] : "lg", ["zIndex"] : "1001", ["minWidth"] : "500px", ["maxWidth"] : "90%", ["maxHeight"] : "90%", ["overflow"] : "auto" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["padding"] : "6" }),direction:"column",gap:"4"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(RadixThemesHeading,{size:"6"},jsx(Fragment_36473de52dc2458231955df647662bd7,{},)),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(Button_925119bcd78900a0655ba56b0bfcb365,{},)),jsx(Fragment_ead898a7dcde397cf6162c15b54c892b,{},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",justify:"end",gap:"3"},jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(Button_0a0367e3b513ce420ab613a834503be4,{},)))))))):(jsx(Fragment,{},))))
  )
}


export default function Component() {





  return (
    jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100vh" }),direction:"row",gap:"0"},jsx(RadixThemesBox,{css:({ ["width"] : "250px", ["height"] : "100vh", ["padding"] : "4", ["background"] : "gray.50", ["borderRight"] : "1px solid", ["borderColor"] : "gray.200" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["height"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesHeading,{css:({ ["padding"] : "4" }),size:"6"},"Billinator"),jsx(RadixThemesSeparator,{size:"4"},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["padding"] : "2" }),direction:"column",gap:"2"},jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/dashboard"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideHome,{size:20},),jsx(RadixThemesText,{as:"p"},"Dashboard")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/products"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucidePackage,{size:20},),jsx(RadixThemesText,{as:"p"},"Products")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/customers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUsers,{size:20},),jsx(RadixThemesText,{as:"p"},"Customers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/suppliers"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideTruck,{size:20},),jsx(RadixThemesText,{as:"p"},"Suppliers")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/purchases"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideShoppingCart,{size:20},),jsx(RadixThemesText,{as:"p"},"Purchases")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/sales"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideReceipt,{size:20},),jsx(RadixThemesText,{as:"p"},"Sales")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/stocks"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideWarehouse,{size:20},),jsx(RadixThemesText,{as:"p"},"Stocks")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/outstanding"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideDollarSign,{size:20},),jsx(RadixThemesText,{as:"p"},"Outstanding")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/reports"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideBarChart,{size:20},),jsx(RadixThemesText,{as:"p"},"Reports")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/users"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideUserCog,{size:20},),jsx(RadixThemesText,{as:"p"},"Users & Roles")))),jsx(RadixThemesLink,{asChild:true,css:({ ["width"] : "100%", ["padding"] : "2", ["borderRadius"] : "md", ["&:hover"] : ({ ["color"] : "var(--accent-8)" }) })},jsx(ReactRouterLink,{to:"/settings"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "2", ["width"] : "100%", ["&:hover"] : ({ ["background"] : "rgba(0,0,0,0.05)" }) }),direction:"row",gap:"2"},jsx(LucideSettings,{size:20},),jsx(RadixThemesText,{as:"p"},"Settings"))))))),jsx(RadixThemesBox,{css:({ ["flex"] : "1", ["padding"] : "6", ["overflowY"] : "auto", ["height"] : "100vh" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%", ["marginBottom"] : "4" }),direction:"row",gap:"3"},jsx(RadixThemesHeading,{size:"9",weight:"bold"},"Sales Invoices"),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"3"},jsx(Button_f7aab9c277d2f138a58f7ddfec9b6d87,{},),jsx(Button_5ec062e3c5dc533f75f293f944d3ba09,{},))),jsx(Fragment_1c1bd071a75c624e537fbe5348bb6c47,{},),jsx(Fragment_ec0ae79f1ad4ec37e5d759ef24aabd8e,{},),jsx(Fragment_00dcea417c42b3654c3752ed65d61dbf,{},),jsx(Fragment_85ab841b0ed2d17f25561274fd01f17a,{},),jsx(Fragment_470438087a5aabf27850b5d1e6ab8674,{},),jsx(Fragment_e2678cb76308dee3236865634a1175d8,{},)))),jsx("title",{},"Sales - Billinator"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}